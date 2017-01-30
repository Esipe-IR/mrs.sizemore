import React from 'react'
import Info from '../../general/Info'

const Account = ({action, user, error, errorMsg, onSubmit, onChange, editAction}) => (
    <form className="form-horizontal" onSubmit={onSubmit}>
        <h2 className="col-sm-offset-2 col-sm-10">{ action ? "Connexion" : "Register"}</h2>

        <p className="col-sm-offset-2 col-sm-10">
            To be able to create or edit data and to track bad behaviour, a connexion is required. <br/>
            Register or connexion is quick and no information will be used outside of the website. <br/>
            Thank you for your understanding !
        </p>

        <Info status={!error} msg={errorMsg} />

        <div className={"form-group " + (error ? "has-error" : "") }>
            <label htmlFor="email" className="col-sm-2 control-label">Email</label>
            
            <div className="col-sm-10">
                <input type="email" className="form-control" id="email" placeholder="Email" onChange={onChange} value={user.email} />
            </div>
        </div>

        <div className={"form-group " + (error ? "has-error" : "")}>
            <label htmlFor="password" className="col-sm-2 control-label">Password</label>
            
            <div className="col-sm-10">
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={onChange} value={user.password} />
            </div>
        </div>

        <div className="form-group">
            <div className="col-sm-offset-2 col-sm-2">
                <button type="submit" className="btn btn-app-secondary sized">{ action ? "Connexion" : "Register"}</button>
            </div>
            <div className="col-sm-8">
                <button type="button" onClick={editAction} className="btn btn-default">{ action ? "Register" : "Connexion"}</button>
            </div>
        </div>
    </form>
)

export default Account
