/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import settingService from "../services/settingService";


const SettingsContext =
  createContext(null);


const defaultSettings = {
  full_name:
    "Farah Ahmad",

  professional_title:
    "Full Stack Web Developer",

  location:
    "Beirut, Lebanon",

  contact_email:
    "farah.ahmad5789@gmail.com",

  hero_label:
    "Hello, I'm",

  hero_description:
    "I build scalable, responsive, and user-focused web applications using modern frontend and backend technologies. I enjoy creating complete solutions from intuitive interfaces to RESTful APIs and database architecture.",

  about_heading:
    "Building complete digital solutions, from frontend to backend.",

  about_text_1:
    "I'm a Computer Science graduate and Full Stack Web Developer passionate about building modern, scalable, and efficient software applications.",

  about_text_2:
    "I work across both frontend and backend development, creating responsive user interfaces, RESTful APIs, authentication systems, database-driven applications, and complete web solutions.",

  about_text_3:
    "My main technologies include Laravel, Spring Boot, React, Vue.js, MySQL, and MongoDB.",

  github_url:
    "https://github.com/Farah-Ahmad",

  linkedin_url:
    "https://www.linkedin.com/in/farah-ahmad-bb1ba426a",

  seo_title:
    "Farah Ahmad | Full Stack Web Developer",

  seo_description:
    "Full Stack Web Developer based in Beirut, Lebanon, building modern and scalable web applications.",

  show_contact_form:
    true,

  show_cv_button:
    true,
};


/*
|--------------------------------------------------------------------------
| Settings Provider
|--------------------------------------------------------------------------
*/

export function SettingsProvider({
  children,
}) {
  const [
    settings,
    setSettings,
  ] = useState(
    defaultSettings
  );

  const [
    settingsLoading,
    setSettingsLoading,
  ] = useState(true);


  /*
  |--------------------------------------------------------------------------
  | Load Public Website Settings
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let active = true;


    const fetchSettings =
      async () => {
        try {
          const response =
            await settingService
              .getSettings();


          const data =
            response.data ||
            response;


          if (
            active &&
            data
          ) {
            setSettings(
              (prev) => ({
                ...prev,
                ...data,
              })
            );
          }
        } catch (error) {
          /*
           * The portfolio can continue
           * using defaultSettings if the
           * API is temporarily unavailable.
           */

          console.error(
            "Could not load website settings:",
            error
          );
        } finally {
          if (active) {
            setSettingsLoading(
              false
            );
          }
        }
      };


    fetchSettings();


    return () => {
      active = false;
    };
  }, []);


  /*
  |--------------------------------------------------------------------------
  | Context Value
  |--------------------------------------------------------------------------
  */

  const value = {
    settings,
    settingsLoading,
  };


  return (
    <SettingsContext.Provider
      value={value}
    >
      {children}
    </SettingsContext.Provider>
  );
}


/*
|--------------------------------------------------------------------------
| Settings Hook
|--------------------------------------------------------------------------
*/

export function useSettings() {
  const context =
    useContext(
      SettingsContext
    );


  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider."
    );
  }


  return context;
}