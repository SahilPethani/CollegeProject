import React from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";

const VerticalStepper = ({ todayAttendence, todayPunchice }) => {
  return (
    <>
      <Box sx={{ height: '400px', overflowY: 'auto' }}>
        <Timeline position="alternate" sx={{ marginTop: '0' }}>
          {
            todayPunchice?.length > 0 && todayPunchice.map((item, index) => (
              <>
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary" fontWeight={"400"}>
                    {dayjs(item?.punch_time).format("h:mm A")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot variant="outlined" color="primary" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent fontWeight={"500"} sx={{ color: item?.type === 'breakOut' || item?.type === 'punchOut' ? "#d32f2f" : "" }}>
                    {
                      item?.type === "punchIn" ? "Punch In" :
                        item?.type === 'breakIn' ? "Break In"
                          : item?.type === 'breakOut' ? "Break Out"
                            : item?.type === 'punchOut' && "Punch Out"
                    }
                  </TimelineContent>
                </TimelineItem>
              </>
            ))
          }
        </Timeline>
      </Box>
    </>
  );
};

export default VerticalStepper;
