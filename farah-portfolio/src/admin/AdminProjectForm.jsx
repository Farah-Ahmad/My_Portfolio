import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import projectService from "../services/projectService";


const emptyForm = {
  title: "",
  slug: "",
  type: "",
  short_description: "",
  description: "",

  technologies: "",
  features: "",
  frontend: "",
  backend: "",
  database_tables: "",

  github: "",
  live_demo: "",

  is_featured: true,
  sort_order: 0,
};


function AdminProjectForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);


  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [formData, setFormData] =
    useState(emptyForm);

  const [loading, setLoading] =
    useState(isEdit);

  const [saving, setSaving] =
    useState(false);

  const [
    uploadingImages,
    setUploadingImages,
  ] = useState(false);

  const [
    deletingImageId,
    setDeletingImageId,
  ] = useState(null);

  const [errors, setErrors] =
    useState({});

  const [
    generalError,
    setGeneralError,
  ] = useState("");

  const [
    selectedImages,
    setSelectedImages,
  ] = useState([]);

  const [
    existingImages,
    setExistingImages,
  ] = useState([]);


  /*
  |--------------------------------------------------------------------------
  | Load Project For Edit
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    /*
     * On the create page, loading is
     * already false because its initial
     * value is based on isEdit.
     */

    if (!isEdit) {
      return;
    }

    let cancelled = false;


    const loadProject = async () => {
      try {
        const response =
          await projectService.getAdminProject(
            id
          );


        if (cancelled) {
          return;
        }


        const project =
          response.data || response;


        setFormData({
          title:
            project.title || "",

          slug:
            project.slug || "",

          type:
            project.type || "",

          short_description:
            project.short_description || "",

          description:
            project.description || "",

          technologies:
            project.technologies?.join(
              ", "
            ) || "",

          features:
            project.features?.join(
              "\n"
            ) || "",

          frontend:
            project.frontend?.join(
              "\n"
            ) || "",

          backend:
            project.backend?.join(
              "\n"
            ) || "",

          database_tables:
            project.database_tables?.join(
              ", "
            ) || "",

          github:
            project.github || "",

          live_demo:
            project.live_demo || "",

          is_featured:
            Boolean(
              project.is_featured
            ),

          sort_order:
            project.sort_order ?? 0,
        });


        setExistingImages(
          project.images || []
        );
      } catch (error) {
        if (cancelled) {
          return;
        }


        /*
         * Authentication errors are
         * handled automatically by api.js.
         */

        if (
          error.response?.status !== 401 &&
          error.response?.status !== 403
        ) {
          setGeneralError(
            "Could not load project."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };


    loadProject();


    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);


  /*
  |--------------------------------------------------------------------------
  | Generate Slug
  |--------------------------------------------------------------------------
  */

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9\s-]/g,
        ""
      )
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };


  /*
  |--------------------------------------------------------------------------
  | Form Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setFormData((prev) => {
      const updated = {
        ...prev,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      };


      /*
       * Generate the slug automatically
       * only while creating a project.
       */

      if (
        name === "title" &&
        !isEdit
      ) {
        updated.slug =
          generateSlug(value);
      }


      return updated;
    });


    /*
     * Clear validation error for
     * the field being changed.
     */

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }


    if (generalError) {
      setGeneralError("");
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Array Helpers
  |--------------------------------------------------------------------------
  */

  const commaArray = (value) => {
    return value
      .split(",")
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);
  };


  const lineArray = (value) => {
    return value
      .split("\n")
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);
  };


  /*
  |--------------------------------------------------------------------------
  | Select Images
  |--------------------------------------------------------------------------
  */

  const handleImagesChange = (e) => {
    const files = Array.from(
      e.target.files || []
    );


    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];


    const validFiles =
      files.filter((file) => {
        const validType =
          allowedTypes.includes(
            file.type
          );

        const validSize =
          file.size <=
          5 * 1024 * 1024;


        return (
          validType &&
          validSize
        );
      });


    /*
     * Some files were invalid.
     */

    if (
      validFiles.length !==
      files.length
    ) {
      setGeneralError(
        "Some images were ignored. Only JPG, PNG and WebP files up to 5MB are allowed."
      );
    } else {
      setGeneralError("");
    }


    /*
     * Maximum 10 screenshots
     * per selection.
     */

    if (
      validFiles.length > 10
    ) {
      setGeneralError(
        "You can upload a maximum of 10 screenshots at a time."
      );

      setSelectedImages(
        validFiles.slice(
          0,
          10
        )
      );

      return;
    }


    setSelectedImages(
      validFiles
    );
  };


  /*
  |--------------------------------------------------------------------------
  | Remove Selected Image Before Upload
  |--------------------------------------------------------------------------
  */

  const removeSelectedImage = (
    imageIndex
  ) => {
    setSelectedImages((prev) =>
      prev.filter(
        (_, index) =>
          index !== imageIndex
      )
    );
  };


  /*
  |--------------------------------------------------------------------------
  | Upload Images
  |--------------------------------------------------------------------------
  */

  const uploadImages = async (
    projectId
  ) => {
    if (
      selectedImages.length === 0
    ) {
      return;
    }


    setUploadingImages(true);


    try {
      await projectService
        .uploadProjectImages(
          projectId,
          selectedImages
        );


      setSelectedImages([]);
    } catch (error) {
      /*
       * Mark the error so the main
       * submit handler knows that the
       * project itself was already saved.
       */

      error.isImageUploadError =
        true;


      if (
        error.response?.status === 422
      ) {
        setGeneralError(
          "One or more screenshots could not be uploaded. Check the file type and size."
        );
      } else if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setGeneralError(
          "Project was saved, but the screenshots could not be uploaded."
        );
      }


      throw error;
    } finally {
      setUploadingImages(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Delete Existing Image
  |--------------------------------------------------------------------------
  */

  const deleteExistingImage =
    async (image) => {
      if (!isEdit) {
        return;
      }


      const confirmed =
        window.confirm(
          "Delete this screenshot?"
        );


      if (!confirmed) {
        return;
      }


      setDeletingImageId(
        image.id
      );

      setGeneralError("");


      try {
        await projectService
          .deleteProjectImage(
            id,
            image.id
          );


        setExistingImages(
          (prev) =>
            prev.filter(
              (item) =>
                item.id !==
                image.id
            )
        );
      } catch (error) {
        if (
          error.response?.status !==
            401 &&
          error.response?.status !==
            403
        ) {
          setGeneralError(
            "Could not delete the screenshot."
          );
        }
      } finally {
        setDeletingImageId(
          null
        );
      }
    };


  /*
  |--------------------------------------------------------------------------
  | Build Payload
  |--------------------------------------------------------------------------
  */

  const buildPayload = () => {
    return {
      title:
        formData.title.trim(),

      slug:
        formData.slug.trim(),

      type:
        formData.type.trim(),

      short_description:
        formData.short_description.trim(),

      description:
        formData.description.trim(),

      technologies:
        commaArray(
          formData.technologies
        ),

      features:
        lineArray(
          formData.features
        ),

      frontend:
        lineArray(
          formData.frontend
        ),

      backend:
        lineArray(
          formData.backend
        ),

      database_tables:
        commaArray(
          formData.database_tables
        ),

      github:
        formData.github.trim() ||
        null,

      live_demo:
        formData.live_demo.trim() ||
        null,

      is_featured:
        formData.is_featured,

      sort_order:
        Number(
          formData.sort_order
        ),
    };
  };


  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();


    setSaving(true);

    setErrors({});

    setGeneralError("");


    const payload =
      buildPayload();


    try {
      let projectId = id;


      /*
       * Update existing project.
       */

      if (isEdit) {
        const response =
          await projectService
            .updateProject(
              id,
              payload
            );


        const updatedProject =
          response.data ||
          response;


        projectId =
          updatedProject.id;
      } else {
        /*
         * Create new project.
         */

        const response =
          await projectService
            .createProject(
              payload
            );


        const createdProject =
          response.data ||
          response;


        projectId =
          createdProject.id;
      }


      /*
       * Upload screenshots after
       * project creation/update.
       */

      if (
        selectedImages.length >
        0
      ) {
        await uploadImages(
          projectId
        );
      }


      /*
       * Everything succeeded.
       */

      navigate(
        "/admin/projects"
      );
    } catch (error) {
      /*
       * Screenshot upload errors
       * already have their own
       * user-friendly message.
       */

      if (
        error.isImageUploadError
      ) {
        return;
      }


      /*
       * Validation errors.
       */

      if (
        error.response?.status ===
        422
      ) {
        const validationErrors =
          error.response?.data
            ?.errors;


        if (
          validationErrors
        ) {
          setErrors(
            validationErrors
          );
        }


        return;
      }


      /*
       * api.js automatically handles
       * expired / invalid admin sessions.
       */

      if (
        error.response?.status !==
          401 &&
        error.response?.status !==
          403
      ) {
        setGeneralError(
          "Something went wrong while saving the project."
        );
      }
    } finally {
      setSaving(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <main className="project-loading-page">
        Loading project...
      </main>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <main className="admin-dashboard">

      <section className="admin-form-container">

        {/* =========================
            HEADER
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <Link
            to="/admin/projects"
            className="admin-back-projects"
          >
            ← Back to Projects
          </Link>


          <p className="section-label">
            {isEdit
              ? "Edit Project"
              : "New Project"}
          </p>


          <h1>
            {isEdit
              ? "Update Project"
              : "Add Project"}
          </h1>


          <p className="admin-form-description">
            Manage the information displayed
            on your public portfolio.
          </p>

        </motion.div>


        {/* =========================
            GENERAL ERROR
        ========================= */}

        {generalError && (
          <div className="admin-dashboard-error">
            {generalError}
          </div>
        )}


        <form
          className="admin-project-form"
          onSubmit={handleSubmit}
        >

          {/* =========================
              BASIC INFORMATION
          ========================= */}

          <div className="admin-form-section">

            <h2>
              Basic Information
            </h2>


            <div className="admin-form-grid">

              {/* TITLE */}

              <div className="form-group">

                <label
                  htmlFor="project-title"
                >
                  Project Title
                </label>


                <input
                  id="project-title"
                  name="title"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Smart Meeting Room"
                />


                {errors.title && (
                  <span className="form-error">
                    {
                      errors
                        .title[0]
                    }
                  </span>
                )}

              </div>


              {/* SLUG */}

              <div className="form-group">

                <label
                  htmlFor="project-slug"
                >
                  Slug
                </label>


                <input
                  id="project-slug"
                  name="slug"
                  value={
                    formData.slug
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="smart-meeting-room"
                />


                {errors.slug && (
                  <span className="form-error">
                    {
                      errors
                        .slug[0]
                    }
                  </span>
                )}

              </div>


              {/* TYPE */}

              <div className="form-group admin-full-field">

                <label
                  htmlFor="project-type"
                >
                  Project Type
                </label>


                <input
                  id="project-type"
                  name="type"
                  value={
                    formData.type
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Full Stack Web Application"
                />


                {errors.type && (
                  <span className="form-error">
                    {
                      errors
                        .type[0]
                    }
                  </span>
                )}

              </div>


              {/* SHORT DESCRIPTION */}

              <div className="form-group admin-full-field">

                <label
                  htmlFor="short-description"
                >
                  Short Description
                </label>


                <textarea
                  id="short-description"
                  name="short_description"
                  rows="3"
                  value={
                    formData.short_description
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Short description displayed on the homepage..."
                />


                {errors.short_description && (
                  <span className="form-error">
                    {
                      errors
                        .short_description[0]
                    }
                  </span>
                )}

              </div>


              {/* DESCRIPTION */}

              <div className="form-group admin-full-field">

                <label
                  htmlFor="full-description"
                >
                  Full Description
                </label>


                <textarea
                  id="full-description"
                  name="description"
                  rows="5"
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Full project description..."
                />


                {errors.description && (
                  <span className="form-error">
                    {
                      errors
                        .description[0]
                    }
                  </span>
                )}

              </div>

            </div>

          </div>


          {/* =========================
              TECHNOLOGIES
          ========================= */}

          <div className="admin-form-section">

            <h2>
              Technologies & Features
            </h2>


            {/* TECHNOLOGIES */}

            <div className="form-group">

              <label
                htmlFor="technologies"
              >
                Technologies
              </label>


              <input
                id="technologies"
                name="technologies"
                value={
                  formData.technologies
                }
                onChange={
                  handleChange
                }
                placeholder="React, Laravel, MySQL, Docker"
              />


              <small>
                Separate technologies
                with commas.
              </small>


              {errors.technologies && (
                <span className="form-error">
                  {
                    errors
                      .technologies[0]
                  }
                </span>
              )}

            </div>


            {/* FEATURES */}

            <div className="form-group">

              <label
                htmlFor="features"
              >
                Key Features
              </label>


              <textarea
                id="features"
                name="features"
                rows="7"
                value={
                  formData.features
                }
                onChange={
                  handleChange
                }
                placeholder={`Authentication
Role-based access
Booking management
REST API`}
              />


              <small>
                Put one feature on
                each line.
              </small>


              {errors.features && (
                <span className="form-error">
                  {
                    errors
                      .features[0]
                  }
                </span>
              )}

            </div>

          </div>


          {/* =========================
              TECHNICAL DETAILS
          ========================= */}

          <div className="admin-form-section">

            <h2>
              Technical Details
            </h2>


            {/* FRONTEND */}

            <div className="form-group">

              <label
                htmlFor="frontend"
              >
                Frontend
              </label>


              <textarea
                id="frontend"
                name="frontend"
                rows="6"
                value={
                  formData.frontend
                }
                onChange={
                  handleChange
                }
                placeholder="One frontend detail per line..."
              />


              {errors.frontend && (
                <span className="form-error">
                  {
                    errors.frontend[0]
                  }
                </span>
              )}

            </div>


            {/* BACKEND */}

            <div className="form-group">

              <label
                htmlFor="backend"
              >
                Backend
              </label>


              <textarea
                id="backend"
                name="backend"
                rows="6"
                value={
                  formData.backend
                }
                onChange={
                  handleChange
                }
                placeholder="One backend detail per line..."
              />


              {errors.backend && (
                <span className="form-error">
                  {
                    errors.backend[0]
                  }
                </span>
              )}

            </div>


            {/* DATABASE */}

            <div className="form-group">

              <label
                htmlFor="database-tables"
              >
                Database Tables
              </label>


              <input
                id="database-tables"
                name="database_tables"
                value={
                  formData.database_tables
                }
                onChange={
                  handleChange
                }
                placeholder="Users, Rooms, Reservations"
              />


              <small>
                Separate table names
                with commas.
              </small>


              {errors.database_tables && (
                <span className="form-error">
                  {
                    errors
                      .database_tables[0]
                  }
                </span>
              )}

            </div>

          </div>


          {/* =========================
              SCREENSHOTS
          ========================= */}

          <div className="admin-form-section">

            <h2>
              Project Screenshots
            </h2>


            <div className="form-group">

              <label
                htmlFor="project-images"
              >
                Upload Screenshots
              </label>


              <input
                id="project-images"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                onChange={
                  handleImagesChange
                }
                className="admin-file-input"
                disabled={
                  saving ||
                  uploadingImages
                }
              />


              <small>
                PNG, JPG or WebP.
                Maximum 5MB per image.
                You can select multiple
                screenshots.
              </small>

            </div>


            {/* SELECTED IMAGES */}

            {selectedImages.length >
              0 && (

              <div className="admin-selected-images">

                <p>
                  {
                    selectedImages.length
                  }{" "}
                  image
                  {selectedImages.length >
                  1
                    ? "s"
                    : ""}{" "}
                  selected
                </p>


                {selectedImages.map(
                  (
                    image,
                    index
                  ) => (

                    <div
                      className="admin-selected-image-item"
                      key={`${image.name}-${image.lastModified}`}
                    >

                      <span>
                        {image.name}
                      </span>


                      <button
                        type="button"
                        disabled={
                          saving ||
                          uploadingImages
                        }
                        onClick={() =>
                          removeSelectedImage(
                            index
                          )
                        }
                      >
                        ✕
                      </button>

                    </div>

                  )
                )}

              </div>

            )}


            {/* EXISTING IMAGES */}

            {isEdit &&
              existingImages.length >
                0 && (

              <div className="admin-existing-images">

                {existingImages.map(
                  (image) => (

                    <div
                      className="admin-existing-image"
                      key={
                        image.id
                      }
                    >

                      <img
                        src={
                          image.url
                        }
                        alt="Project screenshot"
                      />


                      <button
                        type="button"
                        disabled={
                          deletingImageId ===
                            image.id ||
                          saving ||
                          uploadingImages
                        }
                        onClick={() =>
                          deleteExistingImage(
                            image
                          )
                        }
                      >
                        {deletingImageId ===
                        image.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* =========================
              LINKS & VISIBILITY
          ========================= */}

          <div className="admin-form-section">

            <h2>
              Links & Visibility
            </h2>


            <div className="admin-form-grid">

              {/* GITHUB */}

              <div className="form-group">

                <label
                  htmlFor="github"
                >
                  GitHub URL
                </label>


                <input
                  id="github"
                  name="github"
                  value={
                    formData.github
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://github.com/..."
                />


                {errors.github && (
                  <span className="form-error">
                    {
                      errors
                        .github[0]
                    }
                  </span>
                )}

              </div>


              {/* LIVE DEMO */}

              <div className="form-group">

                <label
                  htmlFor="live-demo"
                >
                  Live Demo URL
                </label>


                <input
                  id="live-demo"
                  name="live_demo"
                  value={
                    formData.live_demo
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://..."
                />


                {errors.live_demo && (
                  <span className="form-error">
                    {
                      errors
                        .live_demo[0]
                    }
                  </span>
                )}

              </div>


              {/* SORT ORDER */}

              <div className="form-group">

                <label
                  htmlFor="sort-order"
                >
                  Sort Order
                </label>


                <input
                  id="sort-order"
                  name="sort_order"
                  type="number"
                  min="0"
                  value={
                    formData.sort_order
                  }
                  onChange={
                    handleChange
                  }
                />


                {errors.sort_order && (
                  <span className="form-error">
                    {
                      errors
                        .sort_order[0]
                    }
                  </span>
                )}

              </div>


              {/* VISIBILITY */}

              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  name="is_featured"
                  checked={
                    formData.is_featured
                  }
                  onChange={
                    handleChange
                  }
                />


                <span>
                  Show this project
                  on the public
                  portfolio
                </span>

              </label>

            </div>

          </div>


          {/* =========================
              ACTIONS
          ========================= */}

          <div className="admin-form-actions">

            <Link
              to="/admin/projects"
            >
              Cancel
            </Link>


            <button
              type="submit"
              disabled={
                saving ||
                uploadingImages ||
                deletingImageId !== null
              }
            >
              {saving ||
              uploadingImages
                ? uploadingImages
                  ? "Uploading Screenshots..."
                  : "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Create Project"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}


export default AdminProjectForm;