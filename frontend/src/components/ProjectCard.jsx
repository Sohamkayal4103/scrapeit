import React, { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Text,
  Tag,
  Grid,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const clampLen = 28;
const truncate = (s, n = clampLen) =>
  s && s.length > n ? s.slice(0, n - 1) + "…" : s;

const ProjectCard = ({
  projectName,
  projectDescription,
  projectTechStack,
  type,
  github,
  deployedLink,
}) => {
  const [descExpanded, setDescExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  const typeLabel = (type || "").replace(/_/g, " ").toUpperCase();

  const tags = useMemo(
    () =>
      Array.isArray(projectTechStack) ? projectTechStack.filter(Boolean) : [],
    [projectTechStack]
  );

  const MAX_VISIBLE_TAGS = 4;
  const visibleTags = showAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
  const remaining = Math.max(tags.length - MAX_VISIBLE_TAGS, 0);

  const shouldClampDesc = (projectDescription || "").length > 260;

  // Reusable high-contrast button styles for dark cards
  const btnContrast = {
    variant: "outline",
    colorScheme: "whiteAlpha",
    color: "whiteAlpha.900",
    borderColor: "whiteAlpha.600",
    _hover: { bg: "whiteAlpha.200", borderColor: "whiteAlpha.800" },
    _active: { bg: "whiteAlpha.300" },
  };

  return (
    <Card
      maxW="md"
      h="100%"
      bg="gray.800"
      border="1px solid"
      borderColor="whiteAlpha.200"
      rounded="2xl"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
        borderColor: "whiteAlpha.300",
      }}
    >
      <CardHeader pb={0}>
        <Stack spacing={2}>
          <Heading size="md" lineHeight="1.2">
            {projectName}
          </Heading>
          {typeLabel ? (
            <Tag
              size="sm"
              color="white"
              variant="subtle"
              colorScheme="green"
              w="fit-content"
            >
              {typeLabel}
            </Tag>
          ) : null}
        </Stack>
      </CardHeader>

      <CardBody>
        <Stack spacing={4} mt={2}>
          <Text
            noOfLines={descExpanded || !shouldClampDesc ? undefined : 5}
            color="whiteAlpha.900"
          >
            {projectDescription}
          </Text>

          {shouldClampDesc && (
            <Button
              onClick={() => setDescExpanded((s) => !s)}
              size="sm"
              w="fit-content"
              aria-expanded={descExpanded}
              {...btnContrast}
            >
              {descExpanded ? "Show less" : "Show more"}
            </Button>
          )}

          {tags.length > 0 ? (
            <Stack spacing={2}>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                {visibleTags.map((t, i) => (
                  <Tag
                    key={`${t}-${i}`}
                    variant="subtle"
                    color="white"
                    size="sm"
                    colorScheme="green"
                    as="b"
                    title={t}
                    px={3}
                    height="32px"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    rounded="lg"
                  >
                    <Text
                      as="span"
                      noOfLines={1}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {truncate(t)}
                    </Text>
                  </Tag>
                ))}

                {!showAllTags && remaining > 0 && (
                  <Button
                    onClick={() => setShowAllTags(true)}
                    size="sm"
                    height="32px"
                    px={3}
                    justifySelf="start"
                    rounded="lg"
                    fontWeight="bold"
                    {...btnContrast}
                  >
                    +{remaining} more
                  </Button>
                )}
              </Grid>

              {showAllTags && remaining > 0 && (
                <Button
                  onClick={() => setShowAllTags(false)}
                  size="sm"
                  w="fit-content"
                  rounded="lg"
                  fontWeight="bold"
                  {...btnContrast}
                >
                  Show fewer
                </Button>
              )}
            </Stack>
          ) : null}
        </Stack>
      </CardBody>

      <Divider borderColor="whiteAlpha.200" />

      <CardFooter>
        <ButtonGroup spacing={3}>
          <Button
            as={Link}
            href={github || "#"}
            isExternal
            variant="outline"
            colorScheme="whiteAlpha"
            color="whiteAlpha.900"
            borderColor="whiteAlpha.600"
            _hover={{ bg: "whiteAlpha.200", borderColor: "whiteAlpha.800" }}
            _active={{ bg: "whiteAlpha.300" }}
            isDisabled={!github}
            aria-label="Open GitHub repository"
          >
            GitHub <ExternalLinkIcon mx="6px" />
          </Button>

          <Button
            as={Link}
            href={deployedLink || "#"}
            isExternal
            variant="outline"
            colorScheme="whiteAlpha"
            color="whiteAlpha.900"
            borderColor="whiteAlpha.600"
            _hover={{ bg: "whiteAlpha.200", borderColor: "whiteAlpha.800" }}
            _active={{ bg: "whiteAlpha.300" }}
            isDisabled={!deployedLink}
            aria-label="Open live demo"
          >
            View Demo <ExternalLinkIcon mx="6px" />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
