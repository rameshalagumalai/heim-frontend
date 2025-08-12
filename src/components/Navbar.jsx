export default function Navbar() {
    return (
        <nav className="navbar bg-bg border-bottom fixed-top">
            <div className="container-fluid justify-content-center">
                <h1 onClick={() => document.getElementsByClassName('page')[0].scrollTo(0, 0)} className="f-700 m-0 text-app cursor-pointer">Heim</h1>
            </div>
        </nav>
    );
}