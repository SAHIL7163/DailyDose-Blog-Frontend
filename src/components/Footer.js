import React from "react";

const Footer = () => {
  const today = new Date();

  return (
    <footer className="footer">
      <div className="container">
        <p>Copyright &copy; {today.getFullYear()} DailyDose Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
