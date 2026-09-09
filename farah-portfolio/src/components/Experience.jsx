import { motion } from "framer-motion";

function Experience() {
  const experiences = [
    {
      title: "Treasury Accountant",
      company: "Centro Mall Management",
      date: "May 2025 - September 2025",
      description:
        "Managed daily cash transactions, supported accounts payable processes, verified invoices, assisted with bank reconciliations, and maintained organized financial records.",
    },
  ];

  const education = [
    {
      title: "Bachelor of Science in Computer Science",
      place: "Lebanese International University (LIU)",
    },
  ];

  const training = [
    "Software Engineer Excellence (SE²) Program - 2025",
    "DOT AWS re/Start Program",
    "Full-Stack Web Development Internship - IDS Fintech",
    "CCNA: Introduction to Networks - Cisco",
    "CCNA: Switching, Routing, and Wireless Essentials - Cisco",
    "Network Security Certificate - Cisco",
  ];

  return (
    <section className="experience section" id="experience">
      <div className="section-container">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          <p className="section-label">
            Experience & Background
          </p>

          <h2>
            Professional experience and
            <span> continuous learning.</span>
          </h2>
        </motion.div>

        <div className="experience-layout">

          {/* LEFT SIDE - EXPERIENCE */}
          <motion.div
            className="experience-column"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <div className="experience-column-header">
              <span>01</span>
              <h3>Experience</h3>
            </div>

            <div className="timeline">
              {experiences.map((experience, index) => (
                <motion.div
                  className="timeline-item"
                  key={experience.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >
                  <div className="timeline-dot"></div>

                  <div className="timeline-content">
                    <p className="timeline-date">
                      {experience.date}
                    </p>

                    <h4>
                      {experience.title}
                    </h4>

                    <p className="timeline-company">
                      {experience.company}
                    </p>

                    <p className="timeline-description">
                      {experience.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            className="experience-column"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            {/* EDUCATION */}
            <div className="experience-column-header">
              <span>02</span>
              <h3>Education</h3>
            </div>

            <div className="education-list">
              {education.map((item, index) => (
                <motion.div
                  className="education-card"
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <h4>
                    {item.title}
                  </h4>

                  <p>
                    {item.place}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* TRAINING */}
            <div className="experience-column-header training-header">
              <span>03</span>
              <h3>Training & Certifications</h3>
            </div>

            <div className="training-list">
              {training.map((item, index) => (
                <motion.div
                  className="training-item"
                  key={item}
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >
                  <span className="training-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default Experience;