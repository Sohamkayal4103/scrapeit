import React from "react";
import {
  Flex,
  Spacer,
  Heading,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Divider,
  Text,
  Link,
} from "@chakra-ui/react";

function About() {
  return (
    <>
      <div
        name="About"
        className="max-w-screen-2xl container mx-auto px-4 md:px-20 my-14"
      >
        <div>
          <Heading as="h4" size="lg" color={"green"}>
            About
          </Heading>
          <p className="mt-4 md:text-md text-md">
            I am Soham Kayal, a Master's student in Computer Science at UC Santa
            Cruz, passionate about algorithms, cryptography, and building
            scalable systems. My academic journey has been driven by a strong
            interest in graph algorithms, hardware enclaves, and zero-knowledge
            proofs. At UCSC, I have served as a Teaching Assistant for
            Algorithms (CSE 102) and Cryptography (CSE 108), and contributed
            research under Professors Hamid Sadjadpour and Ioannis Demertzis on
            privacy-preserving graph processing and oblivious algorithms for
            secure enclaves.
          </p>
          <br />
          <p>
            In Summer 2025, I worked as a Software Development Engineer Intern
            at Amazon, where I designed and launched a cross-service
            auto-balancing solution for B2B payments. My project combined
            backend services with frontend workflows to eliminate
            inefficiencies, reduce customer tickets by over 50%, and save weeks
            of developer effort. This experience sharpened my ability to design
            resilient systems at scale while navigating complex cross-service
            integrations.
          </p>
          <br />
          <p>
            Beyond academics and industry, I actively explore applied AI. I have
            built AI agents, MCP Servers and full-stack platforms that bring
            LLMs into real-world workflows, including tools for marketing
            automation and developer productivity. I also have a strong
            foundation in competitive programming, with 1000+ problems solved
            across platforms, a Knight badge on LeetCode (top 5%), and a global
            rank of 1285 in Google Kickstart. Hackathons are another space where
            I thrive. I have won 14 international competitions (ETHGlobal, MLH,
            IIT Bombay OPHacks), often at the intersection of web, blockchain,
            and AI.
          </p>
          <br />
          <p>
            Before UCSC, I completed my undergraduate degree in Information
            Technology with a minor in Blockchain from the University of Mumbai.
            Along the way, I interned at Star Union Dai Ichi Life Insurance,
            improving procurement systems with Flask, Next.js, and MySQL, and
            collaborated with founders to build MVPs for early-stage startups.
          </p>
          <br />
          <p>
            I am open to part-time opportunities now and full-time roles
            starting in 2026, where I can bring together my research background,
            engineering experience, and problem-solving mindset to build
            impactful technologies.
          </p>
          <br />
          <Divider />
          <Heading mt={6} as="h4" size="lg" color={"green"}>
            Education
          </Heading>
          <Flex mt={2}>
            <Heading as={("h4", "u")} size={{ base: "sm", md: "md" }}>
              University of California, Santa Cruz
            </Heading>
            <Spacer />
            <Heading as="h4" size={{ base: "sm", md: "md" }}>
              2024-2026
            </Heading>
          </Flex>
          <UnorderedList>
            <Flex>
              <ListItem>
                <Heading as="h5" size={{ base: "xs", md: "sm" }}>
                  Masters in Computer Science
                </Heading>
              </ListItem>
            </Flex>
            <ListItem>
              <Heading as="h5" size={{ base: "xs", md: "sm" }}>
                GPA: 3.9 / 4
              </Heading>
            </ListItem>
            <ListItem>
              <Heading as="h5" size={{ base: "xs", md: "sm" }}>
                Relevant Coursework: Artificial Intelligence (A+), ML, Analysis
                of Algorithms (A+) (Been a TA), Cryptography (A+) (TA &
                Research), Encryption on Private Data (Research)
              </Heading>
            </ListItem>
            <ListItem>
              <Heading as="h5" size={{ base: "xs", md: "sm" }}>
                TA: CSE 102: Analysis of Algorithms, CSE 108: Algorithmic
                Foundations of Cryptography
              </Heading>
            </ListItem>
          </UnorderedList>
          <br />
          <Flex mt={2}>
            <Heading as={("h4", "u")} size={{ base: "sm", md: "md" }}>
              Vivekanand Education Society's Institute of Technology, Mumbai
            </Heading>
            <Spacer />
            <Heading as="h4" size={{ base: "sm", md: "md" }}>
              2020-2024
            </Heading>
          </Flex>
          <UnorderedList>
            <Flex>
              <ListItem>
                <Heading as="h5" size={{ base: "xs", md: "sm" }}>
                  Bachelors in Information Technology
                </Heading>
              </ListItem>
            </Flex>
            <ListItem>
              <Heading as="h5" size={{ base: "xs", md: "sm" }}>
                CGPA: 8.9 / 10
              </Heading>
            </ListItem>
            <ListItem>
              <Heading as="h5" size={{ base: "xs", md: "sm" }}>
                Relevant Coursework: Operating Systems, Computer Networks,
                Machine Learning (ML), DevOps, Big Data, Cybersecurity, System
                Design
              </Heading>
            </ListItem>
          </UnorderedList>
          <br />
          <br />

          <Divider />
          <Heading as="h4" size="lg" color={"green"} mt={6}>
            Skills & Expertise
          </Heading>
          <UnorderedList mt={6}>
            <ListItem>
              <Flex gap="2">
                <Heading as={("h5", "u")} size={{ base: "xs", md: "md" }}>
                  Programming Languages:
                </Heading>
                <p>C++, Java, Go, Python, TypeScript, JavaScript, Solidity</p>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex gap="2">
                <Heading as={("h5", "u")} size={{ base: "xs", md: "md" }}>
                  Libraries/ Frameworks:
                </Heading>
                <p>
                  Spring Boot, Node.js, Express.js, React.js, Next.js, Flask,
                  Django, Angular, Tailwind CSS , JSP, Ether.js
                </p>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex gap="2">
                <Heading as={("h5", "u")} size={{ base: "xs", md: "md" }}>
                  Database Management:
                </Heading>
                <p>
                  MongoDB(NoSQL), MySQL(SQL), PostgreSQL, Firebase, Supabase,
                  Redis
                </p>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex gap="2">
                <Heading as={("h5", "u")} size={{ base: "xs", md: "md" }}>
                  Tools/Platforms:
                </Heading>
                <p>
                  Git, GitHub, Amazon Web Services (AWS), Google Cloud Platform
                  (GCP), Docker, Kubernetes, Terraform, Selenium, LLMs
                </p>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex gap="2">
                <Heading as={("h5", "u")} size={{ base: "xs", md: "md" }}>
                  Other Skills:
                </Heading>
                <p>
                  Data-Structures & Algorithms (DSA), Problem-Solving, System
                  Design, Web Development, REST API, GraphQL, test-driven
                  development, agile methodology, SDLC, CI/CD, Power BI, Data
                  Visualization, Data Science
                </p>
              </Flex>
            </ListItem>
          </UnorderedList>

          <br />
          <br />

          <Divider />
          <Heading name="Experience" as="h4" size="lg" color={"green"} mt={6}>
            Professional Experience
          </Heading>
          <Flex mt={2}>
            <Heading as={("h4", "u")} size={{ base: "xs", md: "md" }}>
              Amazon
            </Heading>
            <Spacer />
            <Heading as="h4" size={{ base: "xs", md: "md" }}>
              June 2025- September 2025
            </Heading>
          </Flex>
          <Heading as={("h5", "u")} size={{ base: "xs", md: "md" }} mt={2}>
            Software Development Engineer (SDE) Intern
          </Heading>
          <UnorderedList mt={2}>
            <Flex>
              <ListItem>
                <Text fontSize={{ base: "sm", md: "lg" }}>
                  Single-strategy manual allocation in Apply Funds workflow in
                  Amazon Business caused inefficiencies and high customer
                  tickets.
                </Text>
              </ListItem>
            </Flex>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Built a cross-service solution connecting invoicing,
                invoice-assets, and central invoice services, resolving CSRF
                incompatibility with custom interceptors & annotation overriding
                methods in Amazon's internal framework.
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Implemented monitoring with AWS CDK (metrics, alarms, custom
                CTI) and custom CloudWatch dashboards with programmatic
                additional graph widgets.
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Launched multi-strategy auto-allocation feature, eliminating
                manual effort completely and reducing Apply Funds tickets by 50–
                60%, boosting UX adoption and saving 6–8 weeks of developer
                effort by decoupling existing Apply Funds workflow from in-
                voicing
              </Text>
            </ListItem>
          </UnorderedList>
          <br />
          <Flex mt={2}>
            <Heading as={("h4", "u")} size={{ base: "xs", md: "md" }}>
              Star Union Dai Ichi Life Insurance Company Ltd, Mumbai
            </Heading>
            <Spacer />
            <Heading as="h4" size={{ base: "xs", md: "md" }}>
              March 2023- December 2023
            </Heading>
          </Flex>
          <Heading as={("h5", "u")} size={{ base: "xs", md: "md" }} mt={2}>
            Software Developer Intern
          </Heading>
          <UnorderedList mt={2}>
            <Flex>
              <ListItem>
                <Text fontSize={{ base: "sm", md: "lg" }}>
                  Worked on internal apps for policy validation and stationery
                  supply management.
                </Text>
              </ListItem>
            </Flex>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Utilized technologies such as Next.js, Flask, and MySQL. Ensured
                compliance with industry best practices and project
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Developed comprehensive test suites for accurate data validation
                in the Policy Validation App.
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Implemented a dashboard with visual data representation using
                Chart.js.
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Designed and developed the backend API in the Stationery Supply
                Management app, streamlining the ordering process and enabling
                real-time order tracking
              </Text>
            </ListItem>
          </UnorderedList>
          <br />
          <br />

          <Divider />
          <Heading as="h4" size="lg" color={"green"} mt={6}>
            Certifications & Accomplishments
          </Heading>
          <UnorderedList mt={2}>
            <Flex>
              <ListItem>
                <Text fontSize={{ base: "sm", md: "lg" }}>
                  Knight Badge on Leetcode(Highest Rating:- 1873). Among top
                  5.16% of LeetCoders, Solved 600+ DSA problems.
                </Text>
              </ListItem>
            </Flex>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Won OPHacks organized by Optimism and OnlyDust at IIT Bombay and
                got selected for the Accelerator program. Link:{" "}
                <Link
                  href="https://drive.google.com/file/d/15O4dxWBY891DKKp4D_25Gsq1hvCHp3oZ/view"
                  isExternal
                  color="blue.300"
                  fontWeight="bold"
                >
                  View
                </Link>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Global Rank: -1285 (India Rank: 874) in Google Kickstart 2022
                (Coding competition by Google) Link:{" "}
                <Link
                  href="https://www.linkedin.com/posts/sohamkayal_google-kickstart-competitiveprogramming-activity-6998883090622222336-xHcc/?utm_source=share&utm_medium=member_desktop"
                  isExternal
                  color="blue.300"
                  fontWeight="bold"
                >
                  View
                </Link>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                2nd Best project built on 5ire Chain at Hack This Fall 3.0
                (organized at Gandhinagar, Gujrat)
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Won NFTPort,Scroll,Polybase, Arcana, Scroll, Family ConnectKit
                sponsor prizes at ETHIndia,Scaling Ethereum, ETH For
                All,ETHOnline,LFGHO
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                India Rank: 1319 in Innovate India Coding Championship(National
                Level Competition)
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Certification: Completed Google Cloud Facilitator Program
                gaining expertise in cloud technologies Link:{" "}
                <Link
                  href="https://www.cloudskillsboost.google/public_profiles/e335f17e-e42a-426d-985c-42922fe53799"
                  isExternal
                  color="blue.300"
                  fontWeight="bold"
                >
                  View
                </Link>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: "sm", md: "lg" }}>
                Certification: Presented & Published a research paper on
                Decentralized Healthcare System at ICTIS 2024 Link:{" "}
                <Link
                  href="https://drive.google.com/file/d/1GB5h9acJvySIFQGzs3OoW_AkRDIO4qQb/view"
                  isExternal
                  color="blue.300"
                  fontWeight="bold"
                >
                  View
                </Link>
              </Text>
            </ListItem>
          </UnorderedList>
        </div>
      </div>
      <hr />
    </>
  );
}

export default About;
