import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import cvService from "../services/cvService";


function AdminCv() {
  const [currentCv, setCurrentCv] =
    useState(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  /*
  |--------------------------------------------------------------------------
  | Load Current CV
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    const loadCv = async () => {
      try {
        const response =
          await cvService.getAdminCv();

        if (cancelled) {
          return;
        }

        setCurrentCv(
          response.data || null
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        /*
         * 401 / 403 are handled
         * automatically by api.js.
         */

        if (
          error.response?.status !== 401 &&
          error.response?.status !== 403
        ) {
          setError(
            "Could not load CV information."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCv();

    return () => {
      cancelled = true;
    };
  }, []);


  /*
  |--------------------------------------------------------------------------
  | Select File
  |--------------------------------------------------------------------------
  */

  const handleFileChange = (e) => {
    const file =
      e.target.files?.[0];

    setSuccess("");

    setError("");

    if (!file) {
      setSelectedFile(null);

      return;
    }


    if (
      file.type !==
      "application/pdf"
    ) {
      setSelectedFile(null);

      setError(
        "Please select a PDF file."
      );

      e.target.value = "";

      return;
    }


    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setSelectedFile(null);

      setError(
        "The CV must be smaller than 10MB."
      );

      e.target.value = "";

      return;
    }


    setSelectedFile(file);
  };


  /*
  |--------------------------------------------------------------------------
  | Remove Selected File
  |--------------------------------------------------------------------------
  */

  const removeSelectedFile = () => {
    setSelectedFile(null);

    setError("");

    setSuccess("");

    const input =
      document.getElementById(
        "cv-file"
      );

    if (input) {
      input.value = "";
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Upload
  |--------------------------------------------------------------------------
  */

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError(
        "Please select a PDF first."
      );

      return;
    }


    const replacingExistingCv =
      Boolean(currentCv);


    setUploading(true);

    setError("");

    setSuccess("");


    try {
      const response =
        await cvService.uploadCv(
          selectedFile
        );


      setCurrentCv(
        response.data || null
      );


      setSelectedFile(null);


      const input =
        document.getElementById(
          "cv-file"
        );

      if (input) {
        input.value = "";
      }


      setSuccess(
        replacingExistingCv
          ? "CV replaced successfully."
          : "CV uploaded successfully."
      );
    } catch (error) {
      if (
        error.response?.status === 422
      ) {
        setError(
          error.response?.data
            ?.errors?.cv?.[0] ||
            "The CV could not be uploaded."
        );
      } else if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setError(
          "Something went wrong while uploading the CV."
        );
      }
    } finally {
      setUploading(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = async () => {
    const confirmed =
      window.confirm(
        "Delete the current CV?"
      );

    if (!confirmed) {
      return;
    }


    setDeleting(true);

    setError("");

    setSuccess("");


    try {
      await cvService.deleteCv();


      setCurrentCv(null);

      setSelectedFile(null);


      const input =
        document.getElementById(
          "cv-file"
        );

      if (input) {
        input.value = "";
      }


      setSuccess(
        "CV deleted successfully."
      );
    } catch (error) {
      if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setError(
          "Could not delete the CV."
        );
      }
    } finally {
      setDeleting(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Format File Size
  |--------------------------------------------------------------------------
  */

  const formatSize = (bytes) => {
    if (!bytes) {
      return "Unknown size";
    }

    const mb =
      bytes / 1024 / 1024;

    return `${mb.toFixed(2)} MB`;
  };


  return (
    <main className="admin-dashboard">

      <section className="admin-content">

        {/* =========================
            HEADER
        ========================= */}

        <motion.div
          className="admin-dashboard-heading"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <div>

            <p className="section-label">
              Documents
            </p>

            <h1>
              CV Management
            </h1>

            <p>
              Upload and manage the CV
              available on your public
              portfolio.
            </p>

          </div>

        </motion.div>


        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="admin-dashboard-error">
            {error}
          </div>
        )}


        {/* =========================
            SUCCESS
        ========================= */}

        {success && (
          <div className="form-success">
            {success}
          </div>
        )}


        <div className="admin-cv-grid">

          {/* =========================
              CURRENT CV
          ========================= */}

          <div className="admin-cv-card">

            <div className="admin-cv-card-header">

              <div>

                <span>
                  Current Document
                </span>

                <h2>
                  Portfolio CV
                </h2>

              </div>


              {currentCv && (
                <span className="admin-cv-status">
                  Active
                </span>
              )}

            </div>


            {loading ? (

              <div className="admin-cv-empty">
                Loading...
              </div>

            ) : !currentCv ? (

              <div className="admin-cv-empty">

                <div>
                  PDF
                </div>

                <h3>
                  No CV uploaded
                </h3>

                <p>
                  Upload your CV using
                  the form.
                </p>

              </div>

            ) : (

              <div className="admin-current-cv">

                <div className="admin-cv-icon">
                  PDF
                </div>


                <div className="admin-cv-info">

                  <strong>
                    {
                      currentCv.original_name
                    }
                  </strong>


                  <span>
                    {formatSize(
                      currentCv.size
                    )}
                  </span>


                  <span>
                    Uploaded{" "}
                    {currentCv.created_at
                      ? new Date(
                          currentCv.created_at
                        ).toLocaleString()
                      : ""}
                  </span>

                </div>


                <div className="admin-cv-actions">

                  <a
                    href={currentCv.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open CV
                  </a>


                  <button
                    type="button"
                    onClick={
                      handleDelete
                    }
                    disabled={
                      deleting ||
                      uploading
                    }
                  >
                    {deleting
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </div>

              </div>

            )}

          </div>


          {/* =========================
              UPLOAD
          ========================= */}

          <div className="admin-cv-card">

            <div className="admin-cv-card-header">

              <div>

                <span>
                  Upload
                </span>

                <h2>
                  {currentCv
                    ? "Replace CV"
                    : "Upload CV"}
                </h2>

              </div>

            </div>


            <form
              className="admin-cv-upload"
              onSubmit={
                handleUpload
              }
            >

              <label
                htmlFor="cv-file"
                className="admin-cv-dropzone"
              >

                <span className="admin-cv-upload-icon">
                  ↑
                </span>

                <strong>
                  Choose PDF file
                </strong>

                <p>
                  Maximum size 10MB
                </p>


                <input
                  id="cv-file"
                  type="file"
                  accept="application/pdf"
                  onChange={
                    handleFileChange
                  }
                  disabled={
                    uploading ||
                    deleting
                  }
                />

              </label>


              {selectedFile && (

                <div className="admin-cv-selected">

                  <div>

                    <strong>
                      {
                        selectedFile.name
                      }
                    </strong>

                    <span>
                      {formatSize(
                        selectedFile.size
                      )}
                    </span>

                  </div>


                  <button
                    type="button"
                    onClick={
                      removeSelectedFile
                    }
                    disabled={
                      uploading ||
                      deleting
                    }
                  >
                    ✕
                  </button>

                </div>

              )}


              <button
                type="submit"
                className="admin-cv-upload-button"
                disabled={
                  !selectedFile ||
                  uploading ||
                  deleting
                }
              >
                {uploading
                  ? "Uploading..."
                  : currentCv
                    ? "Replace CV"
                    : "Upload CV"}
              </button>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

export default AdminCv;