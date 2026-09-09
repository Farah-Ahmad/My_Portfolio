import { motion } from "framer-motion";

import {
  useSettings,
} from "../context/SettingsContext";

function About() {
  const { settings } =
    useSettings();

  return (
    <section
      className="about section"
      id="about"
    >
      <div className="section-container">

        {/* =========================
            HEADER
        ========================= */}

        <motion.div
          className="section-header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
        >

          <p className="section-label">
            About Me
          </p>

          <h2>
            {settings.about_heading}
          </h2>

        </motion.div>


        {/* =========================
            ABOUT CONTENT
        ========================= */}

        <div className="about-grid">

          <motion.div
            className="about-content"
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
            }}
          >

            {settings.about_text_1 && (
              <p>
                {settings.about_text_1}
              </p>
            )}


            {settings.about_text_2 && (
              <p>
                {settings.about_text_2}
              </p>
            )}


            {settings.about_text_3 && (
              <p>
                {settings.about_text_3}
              </p>
            )}


            <a
              href="#projects"
              className="about-button"
            >
              Explore My Projects
            </a>

          </motion.div>


          {/* =========================
              STATS
          ========================= */}

          <motion.div
            className="about-stats"
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
            }}
          >

            <motion.div
              className="stat-card"
              whileHover={{
                y: -5,
              }}
            >
              <h3>
                Full Stack
              </h3>

              <p>
                Frontend & Backend Development
              </p>
            </motion.div>


            <motion.div
              className="stat-card"
              whileHover={{
                y: -5,
              }}
            >
              <h3>
                2+
              </h3>

              <p>
                Featured Software Projects
              </p>
            </motion.div>


            <motion.div
              className="stat-card"
              whileHover={{
                y: -5,
              }}
            >
              <h3>
                10+
              </h3>

              <p>
                Technologies & Development Tools
              </p>
            </motion.div>


            <motion.div
              className="stat-card"
              whileHover={{
                y: -5,
              }}
            >
              <h3>
                CS
              </h3>

              <p>
                Computer Science Graduate
              </p>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;