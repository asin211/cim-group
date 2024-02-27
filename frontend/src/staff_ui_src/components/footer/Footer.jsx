import "./footer.scss";
import "../../css/bootstrap.min.css";

import { ArrowUpwardRounded } from "@material-ui/icons";

const Footer = () => {

    return (
        <div>
            <div class="container" style={{ borderTop: ".5px solid white", marginTop: "-1px" }}>
                <div class="text-white">
                    <div class="row py-4">
                        <div class="">
                            &copy; 2023 CIM Group, All Right Reserved.
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ position: 'fixed', bottom: 40, right: 30}}>
                <a href="#" class="btn btn-warning"><ArrowUpwardRounded className="text-white" /></a>
            </div>
        </div>
    );
};

export default Footer;
