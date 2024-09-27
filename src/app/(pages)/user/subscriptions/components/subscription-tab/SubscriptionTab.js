"use client";

import React, {useState} from "react";
import {useStyles} from "@/app/(pages)/user/subscriptions/components/carouser-section/CarouselSection.style";
import {Box, List, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import SubscriptionDurationOptions
    from "@/app/(pages)/user/subscriptions/components/subscription-duration-options/SubscriptionDurationOptions";
import SubscribeButtons from "@/app/(pages)/user/subscriptions/components/subscribe-buttons/SubscribeButtons";

const SubscriptionTab = ({ pkg, index, color }) => {
    const [duration, setDuration] = useState(false);
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <div
                className="tab__side tab__side--front"
                style={{ position: "relative" }}
            >
                <div className={`tab__picture tab__picture--${index + 1}`}></div>
                <Typography className="heading">
                    <span className={`heading--span heading--span-${index + 1}`}>
                        {pkg.name}
                    </span>
                </Typography>

                <Box sx={{ marginBottom: "8px" }}>
                    <Typography
                        sx={{
                            color: "primary.text1",
                            fontSize: "1.2rem",
                            textAlign: "center",
                            transform: "translateY(10px)",
                        }}
                    >
                        FROM
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "3rem",
                            textAlign: "center",
                            fontWeight: "900",
                        }}
                    >
                        {pkg.price}
                    </Typography>
                    <Typography
                        sx={{
                            color: "primary.text1",
                            fontSize: "1.5rem",
                            textAlign: "center",
                        }}
                    >
                        {pkg.duration}
                    </Typography>
                </Box>
                <SubscribeButtons pkgId={pkg.id} />

                <List
                    sx={{
                        display: "flex",
                        flexDirection: "column",

                        "& li": {
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: "1.5rem",
                            padding: "1rem",

                            "&:not(:last-child)": {
                                borderBottom: "1px solid #eee",
                            },
                        },
                        margin: "0 2rem",
                        width: "100%",
                        height: "100%",
                        justifyContent: "flex-start",
                    }}
                >
                    {pkg?.features &&
                        pkg.features.map((item, index) => {
                            const isDisabled = item.includes("(disabled)");

                            return (
                                <Box
                                    key={item}
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "",
                                        padding: "2px 0",
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={isDisabled ? faTimesCircle : faCheckCircle}
                                        style={{
                                            color: isDisabled ? "#ff4d4f" : color,
                                            marginRight: "1rem",
                                            transform: "translateY(2px)",
                                        }}
                                    />
                                    <Typography sx={{ textAlign: "left" }}>{item.replace(" (disabled)", "")}</Typography>
                                </Box>
                            );
                        })}
                </List>

                {pkg.durationOptions && (
                    <SubscriptionDurationOptions
                        duration={duration}
                        durationOptions={pkg.durationOptions}
                        setDuration={setDuration}
                    />
                )}
            </div>
        </Box>
    );
};

export default SubscriptionTab;
