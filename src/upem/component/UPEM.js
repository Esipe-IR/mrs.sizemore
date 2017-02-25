import React from 'react'
import { Field, reduxForm } from 'redux-form'
import NotificationsSystem from 'reapop'
import theme from 'reapop-theme-wybo'

const UPEM = (props) => (
    <section id="cas" className="fl-theme-desktop">
        <NotificationsSystem theme={theme} />

        <div className="flc-screenNavigator-view-container">
            <div className="fl-screenNavigator-view">
                <div id="header" className="flc-screenNavigator-navbar fl-navbar fl-table">
                    <h1 id="app-name" className="fl-table-cell">Central Authentication Service</h1>
                </div>		
            
                <div id="content" className="fl-screenNavigator-scroll-container">
                    <div id="texte_gauche">
                        <p>
                            Vous pouvez vous authentifier maintenant afin de pouvoir acc&eacute;der
                            ult&eacute;rieurement &agrave; des services prot&eacute;g&eacute;s.
                        </p>
                        <p>
                            Entrez votre nom d'utilisateur et votre mot de passe puis cliquez sur le bouton <b>Connexion</b> ci-dessous pour continuer.
                        </p>
                    </div>

                    <div id="texte_droite"><p>
                        M&eacute;fiez-vous de tous les programmes et pages web qui vous demandent de vous authentifier. 
                        Les pages web de l'Universit&eacute; Paris-Est Marne-la-Vall&eacute;e vous demandant votre nom
                        d'utilisateur et votre mot de passe ont des URLs de la forme https://xxx.u-pem.fr ou https://xxx.univ-mlv.fr .
                        De plus, votre navigateur doit indiquer que vous acc&eacute;dez une page s&eacute;curis&eacute;e.</p>
                    </div>

			        <form id="fm1" className="fm-v clearfix" onSubmit={props.handleSubmit} autoComplete="off">
                        <div className="box" id="login">
                            <h2>Enter your UserID and Password</h2>
                            
                            <div className="row">
                                <label htmlFor="username"><span className="accesskey">U</span>serID:</label>
                                <Field name="username" component="input" type="text" id="username" className="required" autoComplete="false" />
                            </div>
                        
                            <div className="row">
                                <label htmlFor="password"><span className="accesskey">P</span>assword:</label>
                                <Field name="password" component="input" type="password" id="password" className="required" autoComplete="false" />
                            </div>

                            <div className="row check">
                                <Field name="warn" component="input" type="checkbox" id="warn" />
                                <label htmlFor="warn"><span className="accesskey">W</span>arn me before logging me into other sites.</label>
                            </div>

                            <div className="row btn-row">
                                <button className="btn-submit" type="input">LOGIN</button>
                            </div>
                        </div>
               
	                    <div id="sidebar">
	                        <p>For security reasons, please Log Out and Exit your web browser when you are done accessing services that require authentication!</p>
	                    </div>
        	        </form>
                </div>
            </div>
        </div>
    </section>
)

const UPEMForm = reduxForm({
    form: 'upem'
})(UPEM);

export default UPEMForm
