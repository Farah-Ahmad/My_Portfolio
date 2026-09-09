import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
    >
      <div className="footer-container">

        <motion.div
          className="footer-brand"
          whileHover={{
            scale: 1.04,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          Farah<span>.</span>
        </motion.div>

        <p>
          Full Stack Web Developer
        </p>

        <div className="footer-links">

          <motion.a
            href="#home"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Home
          </motion.a>

          <motion.a
            href="#about"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            About
          </motion.a>

          <motion.a
            href="#skills"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Skills
          </motion.a>

          <motion.a
            href="#projects"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Projects
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Contact
          </motion.a>

        </div>

        <div className="footer-bottom">

          <p>
            © {currentYear} Farah Ahmad. All rights reserved.
          </p>

          <motion.a
            href="#home"
            whileHover={{
              x: 4,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            Back to top ↑
          </motion.a>

        </div>

      </div>
    </motion.footer>
  );
}

export default Footer;