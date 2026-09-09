import { useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <div className="navbar-container">

        <motion.a
          href="#home"
          className="logo"
          whileHover={{
            scale: 1.04,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={closeMenu}
        >
          Farah<span>.</span>
        </motion.a>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <motion.a
            href="#about"
            onClick={closeMenu}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            About
          </motion.a>

          <motion.a
            href="#skills"
            onClick={closeMenu}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Skills
          </motion.a>

          <motion.a
            href="#projects"
            onClick={closeMenu}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Projects
          </motion.a>

          <motion.a
            href="#experience"
            onClick={closeMenu}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Experience
          </motion.a>

          <motion.a
            href="#contact"
            onClick={closeMenu}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Contact
          </motion.a>

        </div>

        <motion.a
          href="#contact"
          className="nav-button"
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          Let's Talk
        </motion.a>

        <motion.button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{
            scale: 0.9,
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </motion.button>

      </div>
    </motion.nav>
  );
}

export default Navbar;