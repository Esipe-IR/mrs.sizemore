import React from 'react'
import Info from '../../app/component/Info'

const Account = (props) => (
    <form className="form-horizontal" onSubmit={props.onSubmit}>
        <h2 className="col-sm-offset-2 col-sm-10">{ props.action ? "Connexion" : "Register"}</h2>

        <p className="col-sm-offset-2 col-sm-10">
            To be able to create or edit data and to track bad behaviour, a connexion is required. <br/>
            Register or connexion is quick and no information will be used outside of the website. <br/>
            Thank you for your understanding !
        </p>

        <Info status={!props.error} msg={props.errorMsg} />

        <div className={"form-group " + (props.error ? "has-error" : "") }>
            <label htmlFor="email" className="col-sm-2 control-label">Email</label>
            
            <div className="col-sm-10">
                <input type="email" className="form-control" id="email" placeholder="Email" onChange={props.onChange} value={props.user && props.user.get("email") ? props.user.get("email") : ""} />
            </div>
        </div>

        <div className={"form-group " + (props.error ? "has-error" : "")}>
            <label htmlFor="password" className="col-sm-2 control-label">Password</label>
            
            <div className="col-sm-10">
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={props.onChange} value={props.user && props.user.get("password") ? props.user.get("password") : ""} />
            </div>
        </div>

        <div className="form-group">
            <div className="col-sm-offset-2 col-sm-2">
                <button type="submit" className="btn btn-app-secondary sized">{ props.action ? "Connexion" : "Register"}</button>
            </div>
            <div className="col-sm-8">
                <button type="button" onClick={props.updateAction} className="btn btn-default">{ props.action ? "Register" : "Connexion"}</button>
            </div>
        </div>
    </form>
)

export default Account
