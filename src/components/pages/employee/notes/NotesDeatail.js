import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../layout/spinner";
import dayjs from "dayjs";
import { addComment, getOneNote } from "../../../services/Employee/note";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import socket from "../../../../socket";
import { EmojiEmotionsTwoTone } from "@mui/icons-material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const NotesDeatail = () => {
  const navigate = useNavigate();
  const Note_id = useParams();
  const [noteDetail, setNoteDetail] = useState({});
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("soketGetOneNotes", (data) => {
      setNoteDetail(data.data);
    });

    return () => {
      socket.off("soketGetOneNotes");
    };
  }, [message]);

  const employeeId = JSON.parse(
    window.localStorage.getItem("employeeDetail")
  )._id;
  const [loading, setLoading] = useState(false);

  const getNoteDetails = async () => {
    setLoading(true);
    const result = await getOneNote(Note_id.id);
    if (result?.status === 200) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const heandleSend = async () => {
    if (message !== "" && message !== null) {
      const body = {
        employeeId: employeeId,
        comment_name: message,
      };
      const result = await addComment(Note_id.id, body);
      if (result?.status === 200) {
        setMessage("");
      } else {
        toast.error("Can't send empty message");
      }
    }
  };

  useEffect(() => {
    getNoteDetails();
  }, []);

  const messagesEndRef = useRef();
  useEffect(() => {
    scrollToBottom();
  }, [noteDetail]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const headnleBack = () => {
    if (
      JSON.parse(window.localStorage.getItem("userDetail")).role === "admin"
    ) {
      navigate("/admin/notes");
    } else {
      navigate("/employee/notes");
    }
  };
  return (
    <>
      {loading && <Spinner />}
      <Box>
        <Breadcrumb
          title="Notes Detail"
          sub_page="Notes Detail"
          curent_page="Notes"
        />
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          position: "relative",
          borderRadius: "10px",
          boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
          zIndex: "999",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#dae1f3",
            height: "60px",
            px: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography sx={{ fontWeight: "600", color: "#5b626b" }}>
              Note Detail
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <IconButton
              onClick={headnleBack}
              aria-label="delete"
              size="medium"
              sx={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                boxShadow:
                  "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  boxShadow:
                    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              <ArrowBackTwoToneIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "100%",
            // padding: "0px 20px",
            boxSizing: "border-box",
            height: "700px",
          }}
        >
          <Box
            sx={{
              boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
              border: "1px solid #ededed",
              boxShadow: "0 0 10px #00000026",
              height: "100%",
              // padding: "20px",
              overflow: "auto",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
                borderBottom: "1px solid #eee",
                borderRadius: "0 0.55rem 0 0",
                position: "sticky",
                top: "0",
                left: "0",
                zIndex: "999",
                bgcolor: "#fff",
              }}
            >
              <Typography
                fontSize={"16px"}
                color="red"
                fontWeight={500}
                letterSpacing={"1.5px"}
              >
                {noteDetail?.title}
              </Typography>
              <Typography
                fontSize={"16px"}
                color="#000"
                fontWeight={500}
                letterSpacing={"1.5px"}
              >
                {dayjs(noteDetail?.date).format("ddd, DD MMM YYYY h:mm A")}
              </Typography>
            </Box>
            <Box sx={{ paddingTop: "20px" }}>
              {noteDetail?.comments?.map((comment, i) => (
                <>
                  <Box
                    sx={{
                      paddingX: "20px",
                      borderBottom: "2px solid #fff",
                      display: "flex",
                      justifyContent: `${
                        comment.employee.id === "1" &&
                        JSON.parse(window.localStorage.getItem("userDetail"))
                          .role === "admin"
                          ? "end"
                          : comment.employee.id === employeeId
                          ? "end"
                          : "start"
                      }`,
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          marginBottom: "12px",
                          display: "flex",
                          justifyContent: `${
                            comment.employee.id === "1" &&
                            JSON.parse(
                              window.localStorage.getItem("userDetail")
                            ).role === "admin"
                              ? "end"
                              : comment.employee.id === employeeId
                              ? "end"
                              : "start"
                          }`,
                        }}
                      >
                        <Typography
                          variant="span"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "700",
                            display: "grid",
                            order: `${
                              comment.employee.id === "1" &&
                              JSON.parse(
                                window.localStorage.getItem("userDetail")
                              ).role === "admin"
                                ? "2"
                                : comment.employee.id === employeeId
                                ? "2"
                                : "1"
                            }`,
                          }}
                        >
                          {comment.employee.firstName}
                        </Typography>
                        <Typography
                          variant="span"
                          sx={{
                            fontSize: "12px",
                            fontWeight: "300",
                            color: "#434651",
                            marginTop: "3px",
                            paddingLeft: `${
                              comment.employee.id === "1" &&
                              JSON.parse(
                                window.localStorage.getItem("userDetail")
                              ).role === "admin"
                                ? "0px"
                                : comment.employee.id === employeeId
                                ? "0px"
                                : "6px"
                            }`,
                            paddingRight: `${
                              comment.employee.id === "1" &&
                              JSON.parse(
                                window.localStorage.getItem("userDetail")
                              ).role === "admin"
                                ? "6px"
                                : comment.employee.id === employeeId
                                ? "6px"
                                : "0px"
                            }`,
                            display: "grid",
                            order: `${
                              comment.employee.id === "1" &&
                              JSON.parse(
                                window.localStorage.getItem("userDetail")
                              ).role === "admin"
                                ? "1"
                                : comment.employee.id === employeeId
                                ? "1"
                                : "2"
                            }`,
                          }}
                        >
                          {dayjs(comment.date).format(
                            "ddd, DD MMM YYYY h:mm A"
                          )}
                        </Typography>
                      </Box>
                      <Box
                        className={`${
                          comment.employee.id === "1" &&
                          JSON.parse(window.localStorage.getItem("userDetail"))
                            .role === "admin"
                            ? "User-Chat"
                            : comment.employee.id === employeeId
                            ? "User-Chat"
                            : "Chat"
                        }`}
                        sx={{
                          backgroundColor: `${
                            comment.employee.id === "1" &&
                            JSON.parse(
                              window.localStorage.getItem("userDetail")
                            ).role === "admin"
                              ? "#d9e7ea"
                              : comment.employee.id === employeeId
                              ? "#d9e7ea"
                              : "#e8e8e8"
                          }`,
                          color: "#444",
                          padding: "8px 10px",
                          lineHeight: "26px",
                          borderRadius: "5px",
                          marginBottom: "15px",
                          maxWidth: "700px",
                          position: "relative",
                          // width:"fit-content"
                        }}
                      >
                        <Typography
                          fontSize={"14px"}
                          color={"#000"}
                          fontWeight={500}
                          letterSpacing={"1px"}
                        >
                          {comment.comment_name}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </> 
              ))}
              <div ref={messagesEndRef} />
            </Box>
          </Box>
          <Box
            sx={{
              boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
              boxShadow: "0 0 10px #00000026",
              margin: "15px",
              marginBottom: "0px",
              width: "100%",
              boxSizing: "border-box",
              display: "flex",
              gap: "30px",
              borderTopLeftRadius: "10px !important",
              borderBottomLeftRadius: "0px !important",
              alignItems: "center",
            }}
            className="Chat-input"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0px",
                width: "100%",
                position: "relative",
              }}
            >
              <IconButton
                id="emojiButton"
                onClick={() => setShowEmoji(!showEmoji)}
                sx={{
                  height: "48px",
                  width: "48px",
                  boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
                  borderRadius: "0px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                <EmojiEmotionsTwoTone
                  sx={{ color: "#000", fontSize: "25px" }}
                />
              </IconButton>
              {showEmoji && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "436px",
                    left: "42px",
                    backgroundColor: "#fff",
                    zIndex: "9999",
                  }}
                >
                  <Picker
                    data={data}
                    onEmojiSelect={(emoji) =>
                      setMessage((prevMessage) => prevMessage + emoji.native)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setShowEmoji(false);
                      }
                    }}
                    previewPosition="none"
                    navPosition="bottom"
                    set="Twitter"
                    searchPosition="sticky"
                    skin="2"
                    noCountryFlags="true"
                  />
                </Box>
              )}
              <TextField
                autoFocus={true}
                variant="standard"
                placeholder="Enter your mess"
                sx={{ width: "100%" }}
                value={message}
                defaultValue={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setShowEmoji(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    heandleSend();
                  }
                  if (e.key === "Escape") {
                    setShowEmoji(false);
                  }
                }}
              />
            </Box>
            <IconButton
              onClick={heandleSend}
              sx={{
                height: "48px",
                width: "48px",
                borderTopRightRadius: "10px !important",
                borderBottomRightRadius: "10px !important",
                boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
                borderRadius: "0px",
                backgroundColor: "#3f51b5",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#3f51b5",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NotesDeatail;
