import {
  Button,
  Container,
  createStyles,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { TbCheck } from "react-icons/tb";
import Logo from "../components/Logo";
import Meta from "../components/Meta";
import useUser from "../hooks/user.hook";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const { refreshUser } = useUser();
  const router = useRouter();

  // If the user is already logged in, redirect to the upload page
  useEffect(() => {
    refreshUser().then((user) => {
      if (user) {
        router.replace("/upload");
      }
    });
  }, []);

  return (
    <>
      <Meta title="Home" />
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>privacy focused</span> <br />{" "}
              file sharing platform.
            </Title>
            <Text color="dimmed" mt="md">
              A file transfer service for Stategy customers.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <TbCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <div>
                  <b>U.S.A. Hosted</b> - Hosted in datacentres accrross U.S.A.
                </div>
              </List.Item>
              <List.Item>
                <div>
                  <b>Privacy</b> - Your files in your dedicates Stategy Space.
                </div>
              </List.Item>
              <List.Item>
                <div>
                  <b>No annoying file size limit</b> - Upload as big files as
                  you want. Only your companies Stategy virtual hard drive will be your limit.
                </div>
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                component={Link}
                href="/auth/signUp"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Get started
              </Button>
              <Button
                component={Link}
                href="https://stategy.com"
                target="_blank"
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                stategy.com
              </Button>
            </Group>
          </div>
          <Group className={classes.image} align="center">
            <Logo width={200} height={200} />
          </Group>
        </div>
      </Container>
    </>
  );
}
