import Button from "../components/Buttons";
import Logotipo from "../assets/img/Logotipo.png"

function LogIn() {
    return (
        <div className="bg-login">
            <div className="bg-color">
                <div className="card-logIn">
                    <div className="logIn-form">
                        <img className="logo-cliente" src={Logotipo} />
                        <h2 className="logIn-form_Titular">Portal cliente</h2>
                        <span className="logIn-form_enc">Identifícate</span>
                        <input type="text" className="logIn-form_input" placeholder="Nombre" />
                        <input type="password" className="logIn-form_input" placeholder="Contraseña" />
                        <Button/>
                        <span className="forgot-pass">Olvidé mi contraseña</span>
                    </div>
                </div>
                <div className="footer --foot-login">
                    <div className="copyright">
                        <h6>@DSGCorp. Todos los derechos reservados.</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn