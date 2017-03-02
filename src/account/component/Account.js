import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Breadcrumb from '../../app/component/Breadcrumb'

const Account = (props) => (
    <section className="page-content">
        <Breadcrumb lastItem={"Account"} push={props.router.push} />

        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <h2 className="col-sm-offset-2 col-sm-10">{ props.action ? "Connexion" : "Register"}</h2>

            <p className="col-sm-offset-2 col-sm-10">
                To be able to create or edit data and to track bad behaviour, a connexion is required. <br/>
                Register or connexion is quick and no information will be used outside of the website. <br/>
                Thank you for your understanding !
            </p>

            <div className="form-group text-center">
                <button type="button" onClick={props.connectUPEM} className="btn btn-warning">Connect with UPEM account</button>
            </div>

            <div className={"form-group " + (props.errorBool ? "has-error" : "") }>
                <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                
                <div className="col-sm-10">
                    <Field name="email" component="input" type="email" id="email" className="form-control" placeholder="email" />
                </div>
            </div>

            <div className={"form-group " + (props.errorBool ? "has-error" : "")}>
                <label htmlFor="password" className="col-sm-2 control-label">Password</label>
                
                <div className="col-sm-10">
                    <Field name="password" component="input" type="password" id="password" className="form-control" placeholder="password" />
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-2 margin-btm-5">
                    <button type="submit" className="btn btn-app-secondary sized">{ props.action ? "Connexion" : "Register"}</button>
                </div>
                <div className="col-sm-8">
                    <button type="button" onClick={props.updateAction} className="btn btn-default">{ props.action ? "Register" : "Connexion"}</button>
                </div>
            </div>
        </form>
    </section>
)

const AccountForm = reduxForm({
    form: 'account'
})(Account);

export default AccountForm
