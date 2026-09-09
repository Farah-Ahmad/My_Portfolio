import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import {
  useSettings,
} from "../context/SettingsContext";

function Home() {
  const { settings } =
    useSettings();


  /*
  |--------------------------------------------------------------------------
  | SEO
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const defaultTitle =
      "Farah Ahmad | Full Stack Web Developer";

    const defaultDescription =
      "Full Stack Web Developer based in Beirut, Lebanon, building responsive and scalable applications with React, Vue.js, Laravel, Spring Boot, and MySQL.";


    /*
     * Page title
     */

    document.title =
      settings.seo_title ||
      defaultTitle;


    /*
     * Meta description
     */

    let descriptionTag =
      document.querySelector(
        'meta[name="description"]'
      );

    if (!descriptionTag) {
      descriptionTag =
        document.createElement(
          "meta"
        );

      descriptionTag.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(
        descriptionTag
      );
    }

    descriptionTag.setAttribute(
      "content",
      settings.seo_description ||
        defaultDescription
    );


    /*
     * Open Graph Title
     */

    let ogTitle =
      document.querySelector(
        'meta[property="og:title"]'
      );

    if (!ogTitle) {
      ogTitle =
        document.createElement(
          "meta"
        );

      ogTitle.setAttribute(
        "property",
        "og:title"
      );

      document.head.appendChild(
        ogTitle
      );
    }

    ogTitle.setAttribute(
      "content",
      settings.seo_title ||
        defaultTitle
    );


    /*
     * Open Graph Description
     */

    let ogDescription =
      document.querySelector(
        'meta[property="og:description"]'
      );

    if (!ogDescription) {
      ogDescription =
        document.createElement(
          "meta"
        );

      ogDescription.setAttribute(
        "property",
        "og:description"
      );

      document.head.appendChild(
        ogDescription
      );
    }

    ogDescription.setAttribute(
      "content",
      settings.seo_description ||
        defaultDescription
    );


    /*
     * Twitter Title
     */

    let twitterTitle =
      document.querySelector(
        'meta[name="twitter:title"]'
      );

    if (!twitterTitle) {
      twitterTitle =
        document.createElement(
          "meta"
        );

      twitterTitle.setAttribute(
        "name",
        "twitter:title"
      );

      document.head.appendChild(
        twitterTitle
      );
    }

    twitterTitle.setAttribute(
      "content",
      settings.seo_title ||
        defaultTitle
    );


    /*
     * Twitter Description
     */

    let twitterDescription =
      document.querySelector(
        'meta[name="twitter:description"]'
      );

    if (!twitterDescription) {
      twitterDescription =
        document.createElement(
          "meta"
        );

      twitterDescription.setAttribute(
        "name",
        "twitter:description"
      );

      document.head.appendChild(
        twitterDescription
      );
    }

    twitterDescription.setAttribute(
      "content",
      settings.seo_description ||
        defaultDescription
    );
  }, [
    settings.seo_title,
    settings.seo_description,
  ]);


  return (
    <>
      <Navbar />

      <Hero />

      <About />

      <TechStack />

      <Projects />

      <Experience />

      <Contact />

      <Footer />
    </>
  );
}

export default Home;