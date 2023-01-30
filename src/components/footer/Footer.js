export const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <label>{`© ${currentYear} FastMath`}</label>
    </div>
  )
}
