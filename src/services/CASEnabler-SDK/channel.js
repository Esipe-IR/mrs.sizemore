export default (function() {
    var s_curTranId = Math.floor(Math.random()*1000001);
    var s_boundChans = { };

    function s_addBoundChan(win, origin, scope, handler) {
        function hasWin(arr) {
            for (var i = 0; i < arr.length; i++) if (arr[i].win === win) return true;
            return false;
        }

        var exists = false;


        if (origin === '*') {
            for (var k in s_boundChans) {
                if (!s_boundChans.hasOwnProperty(k)) continue;
                if (k === '*') continue;
                if (typeof s_boundChans[k][scope] === 'object') {
                    exists = hasWin(s_boundChans[k][scope]);
                    if (exists) break;
                }
            }
        } else {
            if ((s_boundChans['*'] && s_boundChans['*'][scope])) {
                exists = hasWin(s_boundChans['*'][scope]);
            }
            if (!exists && s_boundChans[origin] && s_boundChans[origin][scope])
            {
                exists = hasWin(s_boundChans[origin][scope]);
            }
        }
        if (exists) throw new Error("A channel is already bound to the same window which overlaps with origin '"+ origin +"' and has scope '"+scope+"'");

        if (typeof s_boundChans[origin] !== 'object') s_boundChans[origin] = { };
        if (typeof s_boundChans[origin][scope] !== 'object') s_boundChans[origin][scope] = [ ];
        s_boundChans[origin][scope].push({win: win, handler: handler});
    }

    function s_removeBoundChan(win, origin, scope) {
        var arr = s_boundChans[origin][scope];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].win === win) {
                arr.splice(i,1);
            }
        }
        if (s_boundChans[origin][scope].length === 0) {
            delete s_boundChans[origin][scope];
        }
    }

    function s_isArray(obj) {
        if (Array.isArray) return Array.isArray(obj);
        else {
            return (obj.constructor.toString().indexOf("Array") !== -1);
        }
    }

    var s_transIds = { };

    var s_onMessage = function(e) {
        try {
          var m = JSON.parse(e.data);
          if (typeof m !== 'object' || m === null) throw new Error("malformed");
        } catch(e) {
          return;
        }

        var w = e.source;
        var o = e.origin;
        var s, i, meth;

        if (typeof m.method === 'string') {
            var ar = m.method.split('::');
            if (ar.length === 2) {
                s = ar[0];
                meth = ar[1];
            } else {
                meth = m.method;
            }
        }

        if (typeof m.id !== 'undefined') i = m.id;

        if (typeof meth === 'string') {
            var delivered = false;
            if (s_boundChans[o] && s_boundChans[o][s]) {
                for (var j = 0; j < s_boundChans[o][s].length; j++) {
                    if (s_boundChans[o][s][j].win === w) {
                        s_boundChans[o][s][j].handler(o, meth, m);
                        delivered = true;
                        break;
                    }
                }
            }

            if (!delivered && s_boundChans['*'] && s_boundChans['*'][s]) {
                for (j = 0; j < s_boundChans['*'][s].length; j++) {
                    if (s_boundChans['*'][s][j].win === w) {
                        s_boundChans['*'][s][j].handler(o, meth, m);
                        break;
                    }
                }
            }
        }
        else if (typeof i !== 'undefined') {
            if (s_transIds[i]) s_transIds[i](o, meth, m);
        }
    };

    if (window.addEventListener) window.addEventListener('message', s_onMessage, false);
    else if(window.attachEvent) window.attachEvent('onmessage', s_onMessage);

    return {
        build: function(cfg) {
            var chanId = (function () {
                var text = "";
                var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                for(var i=0; i < 5; i++) text += alpha.charAt(Math.floor(Math.random() * alpha.length));
                return text;
            })();

            var debug = function(m) {
                if (cfg.debugOutput && window.console && window.console.log) {
                    try { if (typeof m !== 'string') m = JSON.stringify(m); } catch(e) { }
                    console.log("["+chanId+"] " + m);
                }
            };

            if (!window.postMessage) throw new Error("jschannel cannot run this browser, no postMessage");
            if (!window.JSON || !window.JSON.stringify || ! window.JSON.parse) {
                throw new Error("jschannel cannot run this browser, no JSON parsing/serialization");
            }

            if (typeof cfg !== 'object') throw new Error("Channel build invoked without a proper object argument");

            if (!cfg.window || !cfg.window.postMessage) throw new Error("Channel.build() called without a valid window argument");

            if (window === cfg.window) throw new Error("target window is same as present window -- not allowed");

            var validOrigin = false;
            if (typeof cfg.origin === 'string') {
                var oMatch;
                oMatch = cfg.origin.match(/^https?:\/\/(?:[-a-zA-Z0-9_\.])+(?::\d+)?/)
                if (cfg.origin === "*") validOrigin = true;
                else if (null !== oMatch) {
                    cfg.origin = oMatch[0].toLowerCase();
                    validOrigin = true;
                }
            }

            if (!validOrigin) throw new Error("Channel.build() called with an invalid origin");

            if (typeof cfg.scope !== 'undefined') {
                if (typeof cfg.scope !== 'string') throw new Error('scope, when specified, must be a string');
                if (cfg.scope.split('::').length > 1) throw new Error("scope may not contain double colons: '::'");
            }

            var regTbl = { };
            var outTbl = { };
            var inTbl = { };
            var ready = false;
            var pendingQueue = [ ];

            var postMessage = function(msg, force) {
                if (!msg) throw new Error("postMessage called with null message");

                var verb = (ready ? "post  " : "queue ");
                debug(verb + " message: " + JSON.stringify(msg));
                if (!force && !ready) {
                    pendingQueue.push(msg);
                } else {
                    if (typeof cfg.postMessageObserver === 'function') {
                        try {
                            cfg.postMessageObserver(cfg.origin, msg);
                        } catch (e) {
                            debug("postMessageObserver() raised an exception: " + e.toString());
                        }
                    }

                    cfg.window.postMessage(JSON.stringify(msg), cfg.origin);
                }
            };

            var createTransaction = function(id,origin,callbacks) {
                var shouldDelayReturn = false;
                var completed = false;

                return {
                    origin: origin,
                    invoke: function(cbName, v) {
                        if (!inTbl[id]) throw new Error("attempting to invoke a callback of a nonexistent transaction: " + id);
                        var valid = false;
                        for (var i = 0; i < callbacks.length; i++) if (cbName === callbacks[i]) { valid = true; break; }
                        if (!valid) throw new Error("request supports no such callback '" + cbName + "'");

                        postMessage({ id: id, callback: cbName, params: v});
                    },
                    error: function(error, message) {
                        completed = true;
                        if (!inTbl[id]) throw new Error("error called for nonexistent message: " + id);
                        delete inTbl[id];
                        postMessage({ id: id, error: error, message: message });
                    },
                    complete: function(v) {
                        completed = true;
                        if (!inTbl[id]) throw new Error("complete called for nonexistent message: " + id);
                        delete inTbl[id];
                        postMessage({ id: id, result: v });
                    },
                    delayReturn: function(delay) {
                        if (typeof delay === 'boolean') {
                            shouldDelayReturn = (delay === true);
                        }
                        return shouldDelayReturn;
                    },
                    completed: function() {
                        return completed;
                    }
                };
            };

            var setTransactionTimeout = function(transId, timeout, method) {
              return window.setTimeout(function() {
                if (outTbl[transId]) {
                  var msg = "timeout (" + timeout + "ms) exceeded on method '" + method + "'";
                  (1,outTbl[transId].error)("timeout_error", msg);
                  delete outTbl[transId];
                  delete s_transIds[transId];
                }
              }, timeout);
            };

            var onMessage = function(origin, method, m) {
                if (typeof cfg.gotMessageObserver === 'function') {
                    try {
                        cfg.gotMessageObserver(origin, m);
                    } catch (e) {
                        debug("gotMessageObserver() raised an exception: " + e.toString());
                    }
                }

                if (m.id && method) {
                    if (regTbl[method]) {
                        var trans = createTransaction(m.id, origin, m.callbacks ? m.callbacks : [ ]);
                        inTbl[m.id] = { };
                        try {
                            if (m.callbacks && s_isArray(m.callbacks) && m.callbacks.length > 0) {
                                for (var i = 0; i < m.callbacks.length; i++) {
                                    var path = m.callbacks[i];
                                    var obj = m.params;
                                    var pathItems = path.split('/');
                                    for (var j = 0; j < pathItems.length - 1; j++) {
                                        var cp = pathItems[j];
                                        if (typeof obj[cp] !== 'object') obj[cp] = { };
                                        obj = obj[cp];
                                    }
                                    obj[pathItems[pathItems.length - 1]] = (function() {
                                        var cbName = path;
                                        return function(params) {
                                            return trans.invoke(cbName, params);
                                        };
                                    })();
                                }
                            }
                            var resp = regTbl[method](trans, m.params);
                            if (!trans.delayReturn() && !trans.completed()) trans.complete(resp);
                        } catch(e) {
                            var error = "runtime_error";
                            var message = null;
                            if (typeof e === 'string') {
                                message = e;
                            } else if (typeof e === 'object') {
                                if (e && s_isArray(e) && e.length === 2) {
                                    error = e[0];
                                    message = e[1];
                                }
                                else if (typeof e.error === 'string') {
                                    error = e.error;
                                    if (!e.message) message = "";
                                    else if (typeof e.message === 'string') message = e.message;
                                    else e = e.message;
                                }
                            }

                            if (message === null) {
                                try {
                                    message = JSON.stringify(e);
                                    if (typeof(message) === 'undefined')
                                      message = e.toString();
                                } catch (e2) {
                                    message = e.toString();
                                }
                            }

                            trans.error(error,message);
                        }
                    }
                } else if (m.id && m.callback) {
                    if (!outTbl[m.id] ||!outTbl[m.id].callbacks || !outTbl[m.id].callbacks[m.callback])
                    {
                        debug("ignoring invalid callback, id:"+m.id+ " (" + m.callback +")");
                    } else {
                        outTbl[m.id].callbacks[m.callback](m.params);
                    }
                } else if (m.id) {
                    if (!outTbl[m.id]) {
                        debug("ignoring invalid response: " + m.id);
                    } else {
                        if (m.error) {
                            (1,outTbl[m.id].error)(m.error, m.message);
                        } else {
                            if (m.result !== undefined) (1,outTbl[m.id].success)(m.result);
                            else (1,outTbl[m.id].success)();
                        }
                        delete outTbl[m.id];
                        delete s_transIds[m.id];
                    }
                } else if (method) {
                    if (regTbl[method]) {
                        regTbl[method]({ origin: origin }, m.params);
                    }
                }
            };

            s_addBoundChan(cfg.window, cfg.origin, ((typeof cfg.scope === 'string') ? cfg.scope : ''), onMessage);

            var scopeMethod = function(m) {
                if (typeof cfg.scope === 'string' && cfg.scope.length) m = [cfg.scope, m].join("::");
                return m;
            };

            var obj = {
                unbind: function (method) {
                    if (regTbl[method]) {
                        if (!(delete regTbl[method])) throw new Error("can't delete method: " + method);
                        return true;
                    }
                    return false;
                },
                bind: function (method, cb) {
                    if (!method || typeof method !== 'string') throw new Error("'method' argument to bind must be string");
                    if (!cb || typeof cb !== 'function') throw new Error("callback missing from bind params");

                    if (regTbl[method]) throw new Error("method '"+method+"' is already bound!");
                    regTbl[method] = cb;
                    return this;
                },
                call: function(m) {
                    if (!m) throw new Error('missing arguments to call function');
                    if (!m.method || typeof m.method !== 'string') throw new Error("'method' argument to call must be string");
                    if (!m.success || typeof m.success !== 'function') throw new Error("'success' callback missing from call");

                    var callbacks = { };
                    var callbackNames = [ ];
                    var seen = [ ];

                    var pruneFunctions = function (path, obj) {
                        if (seen.indexOf(obj) >= 0) {
                            throw new Error("params cannot be a recursive data structure")
                        }
                        seen.push(obj);
                       
                        if (typeof obj === 'object') {
                            for (var k in obj) {
                                if (!obj.hasOwnProperty(k)) continue;
                                var np = path + (path.length ? '/' : '') + k;
                                if (typeof obj[k] === 'function') {
                                    callbacks[np] = obj[k];
                                    callbackNames.push(np);
                                    delete obj[k];
                                } else if (typeof obj[k] === 'object') {
                                    pruneFunctions(np, obj[k]);
                                }
                            }
                        }
                    };
                    pruneFunctions("", m.params);

                    var msg = { id: s_curTranId, method: scopeMethod(m.method), params: m.params };
                    if (callbackNames.length) msg.callbacks = callbackNames;

                    if (m.timeout)
                      setTransactionTimeout(s_curTranId, m.timeout, scopeMethod(m.method));

                    outTbl[s_curTranId] = { callbacks: callbacks, error: m.error, success: m.success };
                    s_transIds[s_curTranId] = onMessage;

                    s_curTranId++;

                    postMessage(msg);
                },
                notify: function(m) {
                    if (!m) throw new Error('missing arguments to notify function');
                    if (!m.method || typeof m.method !== 'string') throw new Error("'method' argument to notify must be string");

                    postMessage({ method: scopeMethod(m.method), params: m.params });
                },
                destroy: function () {
                    s_removeBoundChan(cfg.window, cfg.origin, ((typeof cfg.scope === 'string') ? cfg.scope : ''));
                    if (window.removeEventListener) window.removeEventListener('message', onMessage, false);
                    else if(window.detachEvent) window.detachEvent('onmessage', onMessage);
                    ready = false;
                    regTbl = { };
                    inTbl = { };
                    outTbl = { };
                    cfg.origin = null;
                    pendingQueue = [ ];
                    debug("channel destroyed");
                    chanId = "";
                }
            };

            var onReady = function(trans, type) {
                debug('ready msg received');
                if (ready) throw new Error("received ready message while in ready state.  help!");

                if (type === 'ping') {
                    chanId += '-R';
                } else {
                    chanId += '-L';
                }

                obj.unbind('__ready');
                ready = true;
                debug('ready msg accepted.');

                if (type === 'ping') {
                    obj.notify({ method: '__ready', params: 'pong' });
                }

                while (pendingQueue.length) {
                    postMessage(pendingQueue.pop());
                }

                if (typeof cfg.onReady === 'function') cfg.onReady(obj);
            };

            obj.bind('__ready', onReady);
            setTimeout(function() {
                postMessage({ method: scopeMethod('__ready'), params: "ping" }, true);
            }, 0);

            return obj;
        }
    };
})();
