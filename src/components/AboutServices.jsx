import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Divider,
} from "@mui/material";
import { useI18n } from "../i18n/I18nProvider";

import { Reveal, Stagger, MotionBox, item } from "../theme/anim";

import svcRepair      from "../assets/repair.png";
import svcInspection  from "../assets/inspection.png";
import svcCooling     from "../assets/cooling.png";
import svcPainting    from "../assets/painting.png";
import svcFleet       from "../assets/fleet.png";
import svcPreventive  from "../assets/preventive.png";
import svcEmergency   from "../assets/emergency.png";
import svcManufacture from "../assets/manufacture.png";
import svcContracts   from "../assets/contracts.png";

const SERVICE_IMG = {
  repair:      svcRepair,
  inspection:  svcInspection,
  cooling:     svcCooling,
  painting:    svcPainting,
  fleet:       svcFleet,
  preventive:  svcPreventive,
  emergency:   svcEmergency,
  manufacture: svcManufacture,
  contracts:   svcContracts,
};

export default function AboutServices() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  const services = Array.isArray(t("about.services")) ? t("about.services") : [];

  const frosted = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
    transition: "transform .25s ease, box-shadow .25s ease, background .25s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      background: "rgba(255,255,255,0.10)",
      boxShadow: "0 16px 36px rgba(0,0,0,0.22)",
    },
  };

  return (
    <Box
      component="section"
      id="about"
      dir={isAr ? "rtl" : "ltr"}
      sx={{ py: { xs: 4, md: 5 }, direction: isAr ? "rtl" : "ltr" }}
    >
      <Container maxWidth="xl">
        <Divider sx={{ my: { xs: 4, md: 5 }, background: "rgba(255,255,255,.3)", height: 2 }} />

        <Reveal>
          <Box
            sx={{
              ...frosted,
              p: { xs: 2.5, md: 3 },
              mx: "auto",
              maxWidth: 1100,
              width: "100%",
              mb: 4,
              willChange: "transform, opacity",
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: "clamp(1.8rem,4vw,2.2rem)",
                mb: 2,
                color: "#fff",
                textAlign: "center",
                textShadow: "0 2px 8px rgba(0,0,0,.3)",
                letterSpacing: ".2px",
              }}
            >
              {t("about.heading")}
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: 1.6,
                color: "rgba(233,238,247,.95)",
                maxWidth: 980,
                mx: "auto",
                textAlign: "center",
              }}
            >
              {t("about.body")}
            </Typography>
          </Box>
        </Reveal>

        <Box sx={{ maxWidth: 1100, mx: "auto", mt: 3 }}>
          <Stagger>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 2, md: 3 },
                alignItems: "stretch",
              }}
            >
              <MotionBox variants={item} style={{ willChange: "transform, opacity" }}>
                <Box
                  sx={{
                    ...frosted,
                    p: { xs: 2, md: 2.5 },
                    minHeight: { xs: 160, md: 184 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    direction: isAr ? "rtl" : "ltr",
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: "clamp(1.15rem,3vw,1.4rem)",
                      mb: 1,
                      color: "#fff",
                      textAlign: { xs: "center", md: isAr ? "right" : "left" },
                    }}
                  >
                    {t("about.vision_h")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      color: "rgba(233,238,247,.95)",
                      textAlign: { xs: "center", md: isAr ? "right" : "left" },
                    }}
                  >
                    {t("about.vision_t")}
                  </Typography>
                </Box>
              </MotionBox>

              <MotionBox variants={item} style={{ willChange: "transform, opacity" }}>
                <Box
                  sx={{
                    ...frosted,
                    p: { xs: 2, md: 2.5 },
                    minHeight: { xs: 160, md: 184 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    direction: isAr ? "rtl" : "ltr",
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: "clamp(1.15rem,3vw,1.4rem)",
                      mb: 1,
                      color: "#fff",
                      textAlign: { xs: "center", md: isAr ? "right" : "left" },
                    }}
                  >
                    {t("about.mission_h")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      color: "rgba(233,238,247,.95)",
                      textAlign: { xs: "center", md: isAr ? "right" : "left" },
                    }}
                  >
                    {t("about.mission_t")}
                  </Typography>
                </Box>
              </MotionBox>
            </Box>
          </Stagger>
        </Box>

        <Divider sx={{ my: { xs: 4, md: 5 }, background: "rgba(255,255,255,.3)", height: 2 }} />

        <Reveal>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              component="h2"
              id="services"
              sx={{
                fontWeight: 800,
                fontSize: "clamp(1.8rem,4vw,2.2rem)",
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,.3)",
                letterSpacing: ".2px",
              }}
            >
              {t("about.services_h")}
            </Typography>
          </Box>
        </Reveal>

        <Stagger>
          <Grid
            container
            spacing={{ xs: 2.5, md: 3 }}
            justifyContent="center"
            role="list"
            aria-label={t("about.services_h")}
          >
            {services.map((s) => {
              const img = SERVICE_IMG[s.id];
              return (
                <Grid item xs={12} sm={6} md={4} key={s.id} role="listitem">
                  <MotionBox variants={item} style={{ willChange: "transform, opacity" }}>
                    <Card
                      sx={{
                        width: { xs: 280, sm: 310, md: 340 },
                        height: { xs: 280, sm: 310, md: 340 },
                        mx: "auto",
                        borderRadius: "50%",
                        background: "#0e0e15",
                        border: "1px solid rgba(255,255,255,.14)",
                        color: "#fff",
                        boxShadow: "0 18px 36px rgba(0,0,0,.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        transition: "transform .25s ease, box-shadow .25s ease",
                        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 22px 44px rgba(0,0,0,.45)" },
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 2,
                          display: "grid",
                          justifyItems: "center",
                          alignContent: "center",
                          gap: 1,
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        {img && (
                          <Box
                            component="img"
                            src={img}
                            alt={s.title}
                            loading="lazy"
                            sx={{
                              width: { xs: 88, md: 96 },
                              height: { xs: 88, md: 96 },
                              objectFit: "contain",
                              filter: "drop-shadow(0 8px 16px rgba(0,0,0,.25))",
                              mb: 0.5,
                            }}
                          />
                        )}
                        <Typography
                          component="h4"
                          sx={{
                            display: { xs: "none", sm: "block" },
                            fontWeight: 800,
                            fontSize: "1.06rem",
                            lineHeight: 1.25,
                            textShadow: "0 1px 0 rgba(0,0,0,.25)",
                            px: 2,
                          }}
                        >
                          {s.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: ".95rem",
                            lineHeight: 1.45,
                            color: "#e9eef7",
                            px: { xs: 2.25, md: 3 },
                            maxWidth: 260,
                          }}
                        >
                          {s.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
        </Stagger>
      </Container>
    </Box>
  );
}
