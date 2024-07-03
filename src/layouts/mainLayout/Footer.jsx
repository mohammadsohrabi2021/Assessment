

const Footer = () => {

  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <p className="mb-0" style={{color:'#fff',fontFamily:'iran-sans'}}>
              © {currentYear} - <a className="text-muted">تمامی حقوق این وبسایت متعلق به محمد سهرابی هست</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;