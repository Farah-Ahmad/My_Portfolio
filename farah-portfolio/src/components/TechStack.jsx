import { motion } from "framer-motion";

function TechStack() {
  const stacks = [
    {
      title: "Frontend",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Vue.js",
        "Angular",
        "Bootstrap",
        "Responsive Design",
      ],
    },
    {
      title: "Backend",
      skills: [
        "PHP",
        "Laravel",
        "Java",
        "Spring Boot",
        "REST APIs",
        "Authentication",
        "Authorization",
        "CRUD",
      ],
    },
    {
      title: "Databases",
      skills: ["MySQL", "MongoDB"],
    },
    {
      title: "Tools & DevOps",
      skills: [
        "Git",
        "GitHub",
        "VS Code",
        "Postman",
        "Swagger",
        "Docker",
        "Apache Kafka",
        "CI/CD",
      ],
    },
  ];

  return (
    <section className="tech-stack section" id="skills">
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
            Tech Stack
          </p>

          <h2>
            Technologies I use to
            <span> build complete applications.</span>
          </h2>
        </motion.div>

        <div className="stack-grid">
          {stacks.map((stack, index) => (
            <motion.div
              className="stack-card"
              key={stack.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <div className="stack-card-number">
                0{index + 1}
              </div>

              <h3>
                {stack.title}
              </h3>

              <div className="skills-list">
                {stack.skills.map((skill) => (
                  <motion.span
                    className="skill-tag"
                    key={skill}
                    whileHover={{
                      y: -3,
                      scale: 1.03,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TechStack;