import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import messageService from "../services/messageService";


function AdminMessages() {
  const [messages, setMessages] =
    useState([]);

  const [
    selectedMessage,
    setSelectedMessage,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [
    actionLoading,
    setActionLoading,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    lastPage,
    setLastPage,
  ] = useState(1);

  const [stats, setStats] =
    useState({
      total: 0,
      unread: 0,
      read: 0,
    });


  /*
  |--------------------------------------------------------------------------
  | Reply State
  |--------------------------------------------------------------------------
  */

  const [
    replyOpen,
    setReplyOpen,
  ] = useState(false);

  const [
    replySubject,
    setReplySubject,
  ] = useState("");

  const [
    replyMessage,
    setReplyMessage,
  ] = useState("");

  const [
    replySending,
    setReplySending,
  ] = useState(false);

  const [
    replyError,
    setReplyError,
  ] = useState("");

  const [
    replySuccess,
    setReplySuccess,
  ] = useState("");


  /*
  |--------------------------------------------------------------------------
  | Fetch Messages
  |--------------------------------------------------------------------------
  */

  const fetchMessages = async (
    page = 1,
    searchValue = search,
    filterValue = filter
  ) => {
    setLoading(true);

    setError("");

    try {
      const data =
        await messageService.getMessages({
          page,
          search: searchValue,
          status: filterValue,
        });

      const pagination =
        data.messages;

      setMessages(
        pagination?.data || []
      );

      setCurrentPage(
        pagination?.current_page || 1
      );

      setLastPage(
        pagination?.last_page || 1
      );

      setStats(
        data.stats || {
          total: 0,
          unread: 0,
          read: 0,
        }
      );
    } catch (error) {
      if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setError(
          "Could not load messages."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Initial Fetch
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    const loadInitialMessages = async () => {
      try {
        const data =
          await messageService.getMessages({
            page: 1,
            search: "",
            status: "all",
          });

        if (cancelled) {
          return;
        }

        const pagination =
          data.messages;

        setMessages(
          pagination?.data || []
        );

        setCurrentPage(
          pagination?.current_page || 1
        );

        setLastPage(
          pagination?.last_page || 1
        );

        setStats(
          data.stats || {
            total: 0,
            unread: 0,
            read: 0,
          }
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        if (
          error.response?.status !== 401 &&
          error.response?.status !== 403
        ) {
          setError(
            "Could not load messages."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialMessages();

    return () => {
      cancelled = true;
    };
  }, []);


  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setSelectedMessage(null);

    setReplyOpen(false);

    fetchMessages(
      1,
      search,
      filter
    );
  };


  const clearSearch = () => {
    setSearch("");

    setSelectedMessage(null);

    setReplyOpen(false);

    fetchMessages(
      1,
      "",
      filter
    );
  };


  /*
  |--------------------------------------------------------------------------
  | Filter
  |--------------------------------------------------------------------------
  */

  const handleFilterChange = (
    newFilter
  ) => {
    setFilter(newFilter);

    setSelectedMessage(null);

    setReplyOpen(false);

    fetchMessages(
      1,
      search,
      newFilter
    );
  };


  /*
  |--------------------------------------------------------------------------
  | Open Message
  |--------------------------------------------------------------------------
  */

  const openMessage = async (
    message
  ) => {
    setActionLoading(true);

    setError("");

    setReplyOpen(false);

    try {
      const response =
        await messageService.getMessage(
          message.id
        );

      const openedMessage =
        response.data || response;

      setSelectedMessage(
        openedMessage
      );


      /*
      |--------------------------------------------------------------------------
      | Update Message List
      |--------------------------------------------------------------------------
      */

      setMessages((prev) =>
        prev.map((item) =>
          item.id === message.id
            ? {
                ...item,
                is_read: true,
              }
            : item
        )
      );


      /*
      |--------------------------------------------------------------------------
      | Update Statistics
      |--------------------------------------------------------------------------
      */

      if (!message.is_read) {
        setStats((prev) => ({
          ...prev,

          unread: Math.max(
            prev.unread - 1,
            0
          ),

          read:
            prev.read + 1,
        }));
      }
    } catch (error) {
      if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setError(
          "Could not open this message."
        );
      }
    } finally {
      setActionLoading(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Mark Read
  |--------------------------------------------------------------------------
  */

  const markRead = async (
    message
  ) => {
    setActionLoading(true);

    setError("");

    try {
      await messageService.markRead(
        message.id
      );

      setMessages((prev) =>
        prev.map((item) =>
          item.id === message.id
            ? {
                ...item,
                is_read: true,
              }
            : item
        )
      );

      setSelectedMessage((prev) =>
        prev
          ? {
              ...prev,
              is_read: true,
            }
          : prev
      );

      if (!message.is_read) {
        setStats((prev) => ({
          ...prev,

          unread: Math.max(
            prev.unread - 1,
            0
          ),

          read:
            prev.read + 1,
        }));
      }
    } catch (error) {
      if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setError(
          "Could not mark the message as read."
        );
      }
    } finally {
      setActionLoading(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Mark Unread
  |--------------------------------------------------------------------------
  */

  const markUnread = async (
    message
  ) => {
    setActionLoading(true);

    setError("");

    try {
      await messageService.markUnread(
        message.id
      );

      setMessages((prev) =>
        prev.map((item) =>
          item.id === message.id
            ? {
                ...item,
                is_read: false,
              }
            : item
        )
      );

      setSelectedMessage((prev) =>
        prev
          ? {
              ...prev,
              is_read: false,
            }
          : prev
      );

      if (message.is_read) {
        setStats((prev) => ({
          ...prev,

          unread:
            prev.unread + 1,

          read: Math.max(
            prev.read - 1,
            0
          ),
        }));
      }
    } catch (error) {
      if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setError(
          "Could not mark the message as unread."
        );
      }
    } finally {
      setActionLoading(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Delete Message
  |--------------------------------------------------------------------------
  */

  const deleteMessage = async (
    message
  ) => {
    const confirmed =
      window.confirm(
        `Delete the message from ${message.name}?`
      );

    if (!confirmed) {
      return;
    }

    setActionLoading(true);

    setError("");

    try {
      await messageService.deleteMessage(
        message.id
      );

      setSelectedMessage(null);

      setReplyOpen(false);

      const shouldGoBack =
        messages.length === 1 &&
        currentPage > 1;

      const pageToLoad =
        shouldGoBack
          ? currentPage - 1
          : currentPage;

      await fetchMessages(
        pageToLoad,
        search,
        filter
      );
    } catch (error) {
      if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setError(
          "Could not delete the message."
        );
      }
    } finally {
      setActionLoading(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Open Reply
  |--------------------------------------------------------------------------
  */

  const openReply = () => {
    if (!selectedMessage) {
      return;
    }

    setReplySubject(
      `Re: ${
        selectedMessage.subject ||
        "Your message"
      }`
    );

    setReplyMessage("");

    setReplyError("");

    setReplySuccess("");

    setReplyOpen(true);
  };


  /*
  |--------------------------------------------------------------------------
  | Close Reply
  |--------------------------------------------------------------------------
  */

  const closeReply = () => {
    if (replySending) {
      return;
    }

    setReplyOpen(false);

    setReplySubject("");

    setReplyMessage("");

    setReplyError("");

    setReplySuccess("");
  };


  /*
  |--------------------------------------------------------------------------
  | Send Reply
  |--------------------------------------------------------------------------
  */

  const sendReply = async (e) => {
    e.preventDefault();

    if (
      !selectedMessage ||
      replySending
    ) {
      return;
    }


    /*
    |--------------------------------------------------------------------------
    | Frontend Validation
    |--------------------------------------------------------------------------
    */

    if (!replySubject.trim()) {
      setReplyError(
        "Please enter a subject."
      );

      return;
    }

    if (!replyMessage.trim()) {
      setReplyError(
        "Please write your reply."
      );

      return;
    }


    setReplySending(true);

    setReplyError("");

    setReplySuccess("");


    try {
      const response =
        await messageService.replyToMessage(
          selectedMessage.id,
          {
            subject:
              replySubject.trim(),

            message:
              replyMessage.trim(),
          }
        );


      /*
      |--------------------------------------------------------------------------
      | Update Selected Message Reply History
      |--------------------------------------------------------------------------
      */

      if (response.data) {
        setSelectedMessage((prev) => {
          if (!prev) {
            return prev;
          }

          return {
            ...prev,

            replies_count:
              (prev.replies_count ||
                prev.replies?.length ||
                0) + 1,

            last_replied_at:
              response.data.sent_at,

            replies: [
              response.data,
              ...(prev.replies || []),
            ],
          };
        });


        /*
        |--------------------------------------------------------------------------
        | Update Inbox List
        |--------------------------------------------------------------------------
        */

        setMessages((prev) =>
          prev.map((message) =>
            message.id ===
            selectedMessage.id
              ? {
                  ...message,

                  replies_count:
                    (message.replies_count ||
                      0) + 1,

                  last_replied_at:
                    response.data.sent_at,
                }
              : message
          )
        );
      }


      /*
      |--------------------------------------------------------------------------
      | Success
      |--------------------------------------------------------------------------
      */

      setReplySuccess(
        response.message ||
          "Reply sent successfully."
      );

      setReplyMessage("");
    } catch (error) {
      /*
      |--------------------------------------------------------------------------
      | Validation Error
      |--------------------------------------------------------------------------
      */

      if (
        error.response?.status === 422
      ) {
        const validationErrors =
          error.response?.data?.errors;

        const firstError =
          validationErrors
            ? Object.values(
                validationErrors
              )?.[0]?.[0]
            : null;

        setReplyError(
          firstError ||
            "Please check your reply and try again."
        );

        return;
      }


      /*
      |--------------------------------------------------------------------------
      | Other Errors
      |--------------------------------------------------------------------------
      */

      if (
        error.response?.status !== 401 &&
        error.response?.status !== 403
      ) {
        setReplyError(
          error.response?.data?.message ||
            "Could not send the reply. Please try again."
        );
      }
    } finally {
      setReplySending(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Date
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(
      date
    ).toLocaleString();
  };


  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <main className="admin-dashboard">

      <section className="admin-content">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <motion.div
          className="admin-page-heading"
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
              Inbox
            </p>

            <h1>
              Contact Messages
            </h1>

            <p>
              Manage messages submitted
              through your portfolio.
            </p>

          </div>


          {/* =========================
              STATS
          ========================= */}

          <div className="admin-stats">

            <div className="admin-stat-card">

              <span>
                Total
              </span>

              <strong>
                {stats.total}
              </strong>

            </div>


            <div className="admin-stat-card">

              <span>
                Unread
              </span>

              <strong>
                {stats.unread}
              </strong>

            </div>


            <div className="admin-stat-card">

              <span>
                Read
              </span>

              <strong>
                {stats.read}
              </strong>

            </div>

          </div>

        </motion.div>


        {/* =========================
            SEARCH + FILTER
        ========================= */}

        <div className="admin-toolbar">

          <form
            className="admin-search"
            onSubmit={
              handleSearchSubmit
            }
          >

            <input
              type="text"
              placeholder="Search name, email, subject..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />


            <button
              type="submit"
            >
              Search
            </button>


            {search && (
              <button
                type="button"
                className="admin-clear-search"
                onClick={
                  clearSearch
                }
              >
                Clear
              </button>
            )}

          </form>


          <div className="admin-filters">

            <button
              type="button"
              className={
                filter === "all"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleFilterChange(
                  "all"
                )
              }
            >
              All
            </button>


            <button
              type="button"
              className={
                filter === "unread"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleFilterChange(
                  "unread"
                )
              }
            >
              Unread
            </button>


            <button
              type="button"
              className={
                filter === "read"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleFilterChange(
                  "read"
                )
              }
            >
              Read
            </button>

          </div>

        </div>


        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="admin-dashboard-error">
            {error}
          </div>
        )}


        {/* =========================
            MESSAGES
        ========================= */}

        <div className="admin-messages-layout">

          {/* =========================
              LEFT PANEL
          ========================= */}

          <div className="admin-messages-panel">

            {loading ? (

              <div className="admin-empty">
                Loading messages...
              </div>

            ) : messages.length === 0 ? (

              <div className="admin-empty">

                <h3>
                  No messages found
                </h3>

                <p>
                  Try another search or filter.
                </p>

              </div>

            ) : (

              <div className="admin-message-list">

                {messages.map(
                  (message) => (

                    <motion.button
                      type="button"
                      key={
                        message.id
                      }
                      className={`admin-message-item ${
                        !message.is_read
                          ? "unread"
                          : ""
                      } ${
                        selectedMessage?.id ===
                        message.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        openMessage(
                          message
                        )
                      }
                      whileHover={{
                        x: 3,
                      }}
                    >

                      {/* MESSAGE TOP */}

                      <div className="admin-message-top">

                        <div className="admin-message-name">

                          {!message.is_read && (
                            <span className="unread-dot" />
                          )}

                          <span>
                            {message.name}
                          </span>


                          {message.replies_count >
                            0 && (
                            <span className="admin-list-replied">
                              Replied
                            </span>
                          )}

                        </div>


                        <span className="admin-message-date">

                          {new Date(
                            message.created_at
                          ).toLocaleDateString()}

                        </span>

                      </div>


                      {/* SUBJECT */}

                      <strong>
                        {message.subject ||
                          "No subject"}
                      </strong>


                      {/* PREVIEW */}

                      <p>
                        {message.message}
                      </p>

                    </motion.button>

                  )
                )}

              </div>

            )}


            {/* =========================
                PAGINATION
            ========================= */}

            {lastPage > 1 && (

              <div className="admin-pagination">

                <button
                  type="button"
                  disabled={
                    currentPage === 1 ||
                    loading
                  }
                  onClick={() =>
                    fetchMessages(
                      currentPage - 1
                    )
                  }
                >
                  ← Previous
                </button>


                <span>
                  Page {currentPage} of{" "}
                  {lastPage}
                </span>


                <button
                  type="button"
                  disabled={
                    currentPage ===
                      lastPage ||
                    loading
                  }
                  onClick={() =>
                    fetchMessages(
                      currentPage + 1
                    )
                  }
                >
                  Next →
                </button>

              </div>

            )}

          </div>


          {/* =========================
              MESSAGE VIEWER
          ========================= */}

          <div className="admin-message-viewer">

            <AnimatePresence mode="wait">

              {!selectedMessage ? (

                <motion.div
                  key="empty"
                  className="admin-viewer-empty"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >

                  <span>
                    ✉
                  </span>


                  <h3>
                    Select a message
                  </h3>


                  <p>
                    Choose a message from
                    your inbox to read it.
                  </p>

                </motion.div>

              ) : (

                <motion.div
                  key={
                    selectedMessage.id
                  }
                  className="admin-message-detail"
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >

                  {/* =========================
                      DETAIL HEADER
                  ========================= */}

                  <div className="admin-detail-header">

                    <div>

                      <span className="admin-detail-label">
                        From
                      </span>


                      <h2>
                        {
                          selectedMessage.name
                        }
                      </h2>


                      <a
                        href={`mailto:${selectedMessage.email}`}
                      >
                        {
                          selectedMessage.email
                        }
                      </a>

                    </div>


                    {/* STATUS BADGES */}

                    <div className="admin-detail-statuses">

                      <span className="admin-read-status">

                        {
                          selectedMessage.is_read
                            ? "Read"
                            : "Unread"
                        }

                      </span>


                      {selectedMessage.replies
                        ?.length > 0 && (

                        <span className="admin-replied-status">
                          Replied ✓
                        </span>

                      )}

                    </div>

                  </div>


                  {/* =========================
                      META
                  ========================= */}

                  <div className="admin-detail-meta">

                    <div>

                      <span>
                        Subject
                      </span>

                      <p>
                        {selectedMessage.subject ||
                          "No subject"}
                      </p>

                    </div>


                    <div>

                      <span>
                        Received
                      </span>

                      <p>
                        {formatDate(
                          selectedMessage.created_at
                        )}
                      </p>

                    </div>


                    {selectedMessage
                      .last_replied_at && (

                      <div>

                        <span>
                          Last Reply
                        </span>

                        <p>
                          {formatDate(
                            selectedMessage
                              .last_replied_at
                          )}
                        </p>

                      </div>

                    )}

                  </div>


                  {/* =========================
                      ORIGINAL MESSAGE
                  ========================= */}

                  <div className="admin-detail-message">

                    <span>
                      Message
                    </span>

                    <p>
                      {
                        selectedMessage.message
                      }
                    </p>

                  </div>


                  {/* =========================
                      REPLY HISTORY
                  ========================= */}

                  {selectedMessage.replies
                    ?.length > 0 && (

                    <div className="admin-reply-history">

                      <div className="admin-reply-history-header">

                        <span>
                          Reply History
                        </span>

                        <strong>
                          {
                            selectedMessage
                              .replies.length
                          }
                        </strong>

                      </div>


                      <div className="admin-reply-history-list">

                        {selectedMessage.replies.map(
                          (reply) => (

                            <motion.div
                              className="admin-reply-history-item"
                              key={
                                reply.id
                              }
                              initial={{
                                opacity: 0,
                                y: 10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                            >

                              <div className="admin-reply-history-top">

                                <strong>
                                  {
                                    reply.subject
                                  }
                                </strong>


                                <span>
                                  {formatDate(
                                    reply.sent_at
                                  )}
                                </span>

                              </div>


                              <p>
                                {
                                  reply.message
                                }
                              </p>

                            </motion.div>

                          )
                        )}

                      </div>

                    </div>

                  )}


                  {/* =========================
                      ACTIONS
                  ========================= */}

                  <div className="admin-detail-actions">

                    <button
                      type="button"
                      className="admin-reply-button"
                      onClick={
                        openReply
                      }
                      disabled={
                        actionLoading
                      }
                    >
                      Reply by Email
                    </button>


                    {selectedMessage.is_read ? (

                      <button
                        type="button"
                        disabled={
                          actionLoading
                        }
                        onClick={() =>
                          markUnread(
                            selectedMessage
                          )
                        }
                      >
                        Mark Unread
                      </button>

                    ) : (

                      <button
                        type="button"
                        disabled={
                          actionLoading
                        }
                        onClick={() =>
                          markRead(
                            selectedMessage
                          )
                        }
                      >
                        Mark Read
                      </button>

                    )}


                    <button
                      type="button"
                      className="admin-delete-button"
                      disabled={
                        actionLoading
                      }
                      onClick={() =>
                        deleteMessage(
                          selectedMessage
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>

      </section>


      {/* =====================================================
          REPLY EMAIL MODAL
      ===================================================== */}

      <AnimatePresence>

        {replyOpen &&
          selectedMessage && (

          <motion.div
            className="admin-reply-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={
              closeReply
            }
          >

            <motion.div
              className="admin-reply-modal"
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* =========================
                  REPLY HEADER
              ========================= */}

              <div className="admin-reply-header">

                <div>

                  <span>
                    Reply to
                  </span>

                  <h2>
                    {
                      selectedMessage.name
                    }
                  </h2>

                  <p>
                    {
                      selectedMessage.email
                    }
                  </p>

                </div>


                <button
                  type="button"
                  className="admin-reply-close"
                  onClick={
                    closeReply
                  }
                  disabled={
                    replySending
                  }
                  aria-label="Close reply"
                >
                  ✕
                </button>

              </div>


              {/* =========================
                  REPLY FORM
              ========================= */}

              <form
                className="admin-reply-form"
                onSubmit={
                  sendReply
                }
              >

                {/* TO */}

                <div className="form-group">

                  <label htmlFor="reply-to">
                    To
                  </label>

                  <input
                    id="reply-to"
                    type="email"
                    value={
                      selectedMessage.email
                    }
                    disabled
                  />

                </div>


                {/* SUBJECT */}

                <div className="form-group">

                  <label htmlFor="reply-subject">
                    Subject
                  </label>

                  <input
                    id="reply-subject"
                    type="text"
                    value={
                      replySubject
                    }
                    onChange={(e) => {
                      setReplySubject(
                        e.target.value
                      );

                      setReplyError("");

                      setReplySuccess("");
                    }}
                    maxLength={200}
                    placeholder="Email subject"
                    disabled={
                      replySending ||
                      Boolean(
                        replySuccess
                      )
                    }
                  />

                </div>


                {/* MESSAGE */}

                <div className="form-group">

                  <label htmlFor="reply-message">
                    Message
                  </label>

                  <textarea
                    id="reply-message"
                    rows="9"
                    value={
                      replyMessage
                    }
                    onChange={(e) => {
                      setReplyMessage(
                        e.target.value
                      );

                      setReplyError("");

                      setReplySuccess("");
                    }}
                    maxLength={5000}
                    placeholder="Write your reply..."
                    disabled={
                      replySending ||
                      Boolean(
                        replySuccess
                      )
                    }
                  />

                </div>


                {/* ERROR */}

                {replyError && (
                  <div className="form-error-general">
                    {replyError}
                  </div>
                )}


                {/* SUCCESS */}

                {replySuccess && (
                  <div className="form-success">
                    {replySuccess}
                  </div>
                )}


                {/* =========================
                    REPLY ACTIONS
                ========================= */}

                <div className="admin-reply-actions">

                  <button
                    type="button"
                    className="admin-reply-cancel"
                    onClick={
                      closeReply
                    }
                    disabled={
                      replySending
                    }
                  >
                    {replySuccess
                      ? "Close"
                      : "Cancel"}
                  </button>


                  {!replySuccess && (
                    <button
                      type="submit"
                      className="admin-reply-send"
                      disabled={
                        replySending
                      }
                    >
                      {replySending
                        ? "Sending..."
                        : "Send Reply"}
                    </button>
                  )}

                </div>

              </form>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
}

export default AdminMessages;