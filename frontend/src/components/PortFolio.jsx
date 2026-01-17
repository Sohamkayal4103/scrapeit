import React from "react";
import ProjectCard from "./ProjectCard";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";

function PortFolio() {
  const projects = [
    {
      id: 1,
      projectName: "Privacy Preserving Graph Processing on Hardware Enclaves",
      projectDescription:
        "Built a secure graph-processing framework in C++ that runs inside Intel SGX enclaves to prevent leakage of access patterns when outsourcing computations. Implemented oblivious versions of BFS, DFS, and Dijkstra’s algorithm, ensuring that only graph size and query type are visible to an adversary. To guarantee deterministic execution traces, I designed doubly-oblivious data layouts using an Omix++-style map, fixing both memory and control flows. Achieved near-linear runtimes with <15% overhead, demonstrating strong privacy with minimal performance loss.",
      projectTechStack: [
        "C++",
        "Data Structures & Algorithms (AVL Tree, Graphs, Ordered Map)",
        "Oblivious Computations",
        "Hardware Enclaves (Intel SGX)",
      ],
      type: "full_stack",
      github: "https://github.com/Sohamkayal4103/GraphOS",
    },
    {
      id: 2,
      projectName: "Hardware Hierarchical Dynamic Structure (HHDS)",
      projectDescription:
        "Developed a dynamic graph representation in C++ supporting efficient addition and removal of nodes and edges, with 32-bit node identifiers and tombstone deletion. Designed a memory-efficient layout with four node types (Free, Node, Pin, Overflow), keeping common cases compact (16 bytes) while using overflow containers and hash sets for high-degree nodes. Implemented arbitrary and topological traversals for hardware tool graphs, and currently extending the framework with incremental topological sort and optimized iterators for dynamic graph updates.",
      projectTechStack: ["C++", "Dynamic Graphs", "Tree Data Structures"],
      type: "full_stack",
      github: "https://github.com/masc-ucsc/hhds",
    },
    {
      id: 3,
      projectName: "Hotel Management System",
      projectDescription:
        "Built a full-stack Hotel Management System with features such as room booking, pricing display, reviews, and room type showcasing. Developed secure login functionality for administrators and customers using Spring Security. Frontend built with HTML, CSS, and JavaScript, while the backend leveraged Spring Boot, Hibernate, and MySQL for robust performance and efficient data management. Integrated Thymeleaf for server-side templating, delivering a dynamic and responsive user interface.",
      projectTechStack: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "Hibernate",
        "Thymeleaf",
        "MySQL",
        "HTML",
        "CSS",
        "JavaScript",
      ],
      type: "full_stack",
      github: "https://github.com/Sohamkayal4103/Hotel-Managment-System",
    },
    {
      id: 4,
      projectName: "TechX",
      projectDescription:
        "TechX is an advanced event management platform built using the MERN stack. Organizers can add tech events such as meetups and hackathons, with the admin ensuring event legitimacy and approving speakers and judges. Users can apply as volunteers and purchase tickets for paid events securely through the integrated Stripe API. The platform utilizes the Google Maps API for location autocomplete and displaying event venues on maps. Additionally, nodemailer facilitates email communication, while Auth0 handles user signup and authentication.",
      projectTechStack: [
        "ReactJs",
        "NodeJs",
        "ExpressJs",
        "MongoDB",
        "Auth0",
        "Google Cloud APIs",
        "Nodemailer",
        "Chakra UI",
      ],
      type: "full_stack",
      github: "https://github.com/Sohamkayal4103/TechX-Mumbai",
      deployedLink: "https://tech-x-mumbai.vercel.app",
    },
    {
      id: 5,
      projectName: "BondsBy: A Bonds Trading Platform",
      projectDescription:
        "BondsBy is a bond trading and management platform built with React.js for the frontend, Node.js and Express.js for the backend, and MongoDB as the database. It offers a comprehensive solution for investors and traders, providing features like bond portfolio tracking, real-time bond market data, risk assessment tools, and browser push notifications for new bond alerts. Users can view their purchased bonds and track profit earned on their user profile page. BondsBy showcases expertise in web development and provides a seamless bond trading experience.",
      projectTechStack: [
        "ReactJs",
        "NodeJs",
        "ExpressJs",
        "MongoDB",
        "Auth0",
        "Chakra UI",
      ],
      type: "full_stack",
      github: "https://github.com/Sohamkayal4103/BondsBy",
      deployedLink: "https://github.com/Sohamkayal4103/BondsBy",
    },
    {
      id: 6,
      projectName: "Flavours101",
      projectDescription:
        "A food website made using ReactJS, Tailwind CSS, and Auth0 for sign-up and login displays recipes from various cuisines based on the ingredient entered by the user. Users can view detailed step-by-step recipes along with instructional videos if needed, ensuring a seamless and enjoyable cooking experience. The platform is designed to help users explore diverse culinary options and make delicious meals with ease.",
      projectTechStack: ["ReactJs", "Tailwind", "Auth0"],
      type: "full_stack",
      github: "https://github.com/Sohamkayal4103/Food-Website",
      deployedLink: "https://flavours101.netlify.app/",
    },
    {
      id: 7,
      projectName: "TechV3nt: An event management platform",
      projectDescription:
        "Developed Techv3nt, a decentralized event management platform using ReactJS for the frontend and Solidity for smart contracts. The platform allows organizers to connect their MetaMask wallet to list events, with all event data stored in smart contracts deployed on the 5ire and Goerli Test Networks. Event verification is managed by an admin, ensuring that only verified events are listed on the main events page for users to view and register. Utilized Ether.js to connect smart contracts to the frontend and implemented user onboarding with Rainbow Kit. Additionally, created a custom chain for the 5ire network using Wagmi Provider and integrated incentivized NFT (POAP) minting with NFTPort on the Goerli Test Network.",
      projectTechStack: [
        "ReactJs",
        "Tailwind",
        "Solidity",
        "MetaMask",
        "Ether.js",
        "Rainbow Kit",
        "Wagmi",
        "NFTPort",
      ],
      type: "blockchain",
      github: "https://github.com/Sohamkayal4103/Techv3nt",
      deployedLink: "https://github.com/Sohamkayal4103/Techv3nt",
    },
    {
      id: 8,
      projectName: "Decentralized Healthcare System",
      projectDescription:
        "The Decentralized Healthcare System is a pioneering solution that leverages blockchain technology to revolutionize healthcare data management. By securely storing patient and doctor information on the blockchain, ensuring doctors undergo a robust KYC process, and utilizing IPFS for file storage, the system enhances data security and integrity. Additionally, the integration of the Anon Aadhaar SDK for doctor verification, blockchain-based payments, and the Huddle SDK for online consultations further solidifies its technological prowess. Furthermore, the use of the ERC-4337 account abstraction standard facilitates the seamless transition of web2 users into the web3 space. This comprehensive approach makes the system a trailblazer in decentralized healthcare solutions.",
      projectTechStack: [
        "TypeScript",
        "NextJs",
        "Chakra UI",
        "Solidity",
        "Ether.js",
        "Particle Auth",
        "Wagmi",
        "NFTPort",
        "Push Protocol",
        "Huddle sdk",
      ],
      type: "blockchain",
      github:
        "https://github.com/Sohamkayal4103/decentralized-healthcare-system",
      deployedLink: "https://www.youtube.com/watch?v=CGYK2OF0Qgw",
    },
    {
      id: 9,
      projectName: "DaoConnect",
      projectDescription:
        "Using DAOConnect, you can create Decentralised Autonomous Organisations (DAOs) within minutes by filling out simple forms. You can create or import governance tokens, configure quorum, determine visibility, and set voting and proposing thresholds. Additionally, you can create proposals and choose between normal or quadratic voting mechanisms. DAOConnect also integrates the ERC4337 Account Abstraction standard for seamless onboarding of web2 users into the web3 space. Furthermore, DAOConnect utilizes the Bandada API to create anonymous Bandada Groups, facilitating the verification of user identities without revealing them. Overall, DAOConnect aims to democratize DAO governance, making it accessible and efficient for communities, organizations, and individuals.",
      projectTechStack: [
        "TypeScript",
        "NextJs",
        "Chakra UI",
        "Solidity",
        "Ether.js",
        "Particle Auth",
        "Wagmi",
        "NFTPort",
        "Bandada",
        "Semaphore",
      ],
      type: "blockchain",
      github: "https://github.com/Sohamkayal4103/DAOConnect",
      deployedLink: "https://op-hacks.vercel.app",
    },
    {
      id: 10,
      projectName: "Aave-Anonify",
      projectDescription:
        "Developed Aave-Anonify, a platform providing loans to artists using stablecoins like GHO tokens and DAI, with NFTs of their creations as collateral. Integrated with Aave v3 for optimized asset management, ensuring efficient yield generation and borrowing power. Created a unique marketplace for NFTs, allowing investors to lend against promising artworks. The platform offers flexible repayment options, aligning incentives between artists and lenders for shared success, and addresses the financial challenges of artists by leveraging decentralized finance and the NFT market.",
      projectTechStack: [
        "TypeScript",
        "NextJs",
        "Chakra UI",
        "Solidity",
        "Ether.js",
        "RainbowKit",
        "Wagmi",
        "NFTPort",
        "GraphQL",
        "Anon Aadhaar",
        "Apollo-Client",
        "The Graph",
      ],
      type: "blockchain",
      github: "https://github.com/MukulKolpe/ETHMumbai",
      deployedLink: "https://eth-mumbai-omega.vercel.app",
    },
    {
      id: 11,
      projectName: "MarketGenie - AI Marketing Agent",
      projectDescription:
        "Developed MarketGenie, an AI-powered marketing agent that helps small businesses generate ready-to-post social media campaigns. Built a full-stack application using Next.js, React, Chakra UI, Node.js, Express.js, and AWS RDS (PostgreSQL), with AWS Lambda for event-driven execution. Integrated Auth0 for secure authentication and Anthropic’s Claude API for AI-driven content creation. Reduced campaign creation time from days to seconds, enabling efficient, multi-platform marketing.",
      projectTechStack: [
        "Next.js",
        "React",
        "Chakra UI",
        "Auth0 SDK",
        "Node.js",
        "Express.js",
        "pg (PostgreSQL)",
        "Python",
        "AWS RDS (PostgreSQL)",
        "Anthropic Claude API",
        "Vercel",
        "AWS Lambda",
      ],
      type: "ai_agent",
      github: "https://github.com/Sohamkayal4103/aws_mcp_hackathon",
    },
    {
      id: 12,
      projectName: "Fake Currency Detection",
      projectDescription:
        "Developed a machine learning model using TensorFlow and Keras with VGG16 transfer learning (pre-trained on ImageNet) to detect counterfeit currency, achieving 92% accuracy on a dataset of 1000+ real and fake notes. Applied image preprocessing techniques with OpenCV, along with data augmentation, early stopping, and dropout to reduce overfitting. Built a full-stack application with a React.js frontend and Flask backend, reducing detection time by 20% and improving user experience.",
      projectTechStack: [
        "React.js",
        "Flask",
        "OpenCV",
        "TensorFlow",
        "Keras",
        "ImageNet",
        "YOLOv8",
      ],
      type: "ai_agent",
      github: "https://github.com/Sohamkayal4103/fake-currency-detection",
    },
    {
      id: 13,
      projectName: "Quiz App (iOS)",
      projectDescription:
        "Built an interactive Quiz App for iOS using Swift and Xcode, showcasing mobile app development proficiency. Designed a scalable question bank system with Swift’s object-oriented features and the Codable protocol, allowing easy addition and modification of quiz content from JSON. Integrated Core Data for persistent storage of user progress and high scores, enhancing user engagement and retention.",
      projectTechStack: [
        "Swift 5",
        "Xcode 15.4",
        "UIKit",
        "Core Data",
        "JSON Parsing",
      ],
      type: "mobile",
      github: "https://github.com/Sohamkayal4103/Quiz-App",
    },
  ];

  return (
    <>
      <div
        name="Portfolio"
        className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-10"
      >
        <div>
          <Heading mt={6} as="h4" size="lg" color={"green"}>
            Portfolio
          </Heading>
          <Center>
            <Tabs mt={4} variant="soft-rounded" colorScheme="green">
              <TabList>
                <Tab>Full-Stack</Tab>
                <Tab>AI</Tab>
                <Tab>Blockchain</Tab>
                <Tab>Mobile</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Grid
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      md: "repeat(3, 1fr)",
                    }}
                    gap={10}
                    mt={5}
                  >
                    {projects
                      .filter((project) => project.type === "full_stack")
                      .map(
                        ({
                          projectName,
                          projectDescription,
                          projectTechStack,
                          type,
                          github,
                          deployedLink,
                        }) => (
                          <ProjectCard
                            projectName={projectName}
                            projectDescription={projectDescription}
                            projectTechStack={projectTechStack}
                            type={type}
                            github={github}
                            deployedLink={deployedLink}
                          />
                        )
                      )}
                  </Grid>{" "}
                </TabPanel>
                <TabPanel>
                  <Grid
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      md: "repeat(3, 1fr)",
                    }}
                    gap={10}
                    mt={5}
                  >
                    {projects
                      .filter((project) => project.type === "ai_agent")
                      .map(
                        ({
                          projectName,
                          projectDescription,
                          projectTechStack,
                          type,
                          github,
                          deployedLink,
                        }) => (
                          <ProjectCard
                            projectName={projectName}
                            projectDescription={projectDescription}
                            projectTechStack={projectTechStack}
                            type={type}
                            github={github}
                            deployedLink={deployedLink}
                          />
                        )
                      )}
                  </Grid>{" "}
                </TabPanel>
                <TabPanel>
                  <Grid
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      md: "repeat(3, 1fr)",
                    }}
                    gap={10}
                    mt={5}
                  >
                    {projects
                      .filter((project) => project.type === "blockchain")
                      .map(
                        ({
                          projectName,
                          projectDescription,
                          projectTechStack,
                          type,
                          github,
                          deployedLink,
                        }) => (
                          <ProjectCard
                            projectName={projectName}
                            projectDescription={projectDescription}
                            projectTechStack={projectTechStack}
                            type={type}
                            github={github}
                            deployedLink={deployedLink}
                          />
                        )
                      )}
                  </Grid>{" "}
                </TabPanel>

                <TabPanel>
                  <Grid
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      md: "repeat(3, 1fr)",
                    }}
                    gap={10}
                    mt={5}
                  >
                    {projects
                      .filter((project) => project.type === "mobile")
                      .map(
                        ({
                          projectName,
                          projectDescription,
                          projectTechStack,
                          type,
                          github,
                          deployedLink,
                        }) => (
                          <ProjectCard
                            projectName={projectName}
                            projectDescription={projectDescription}
                            projectTechStack={projectTechStack}
                            type={type}
                            github={github}
                            deployedLink={deployedLink}
                          />
                        )
                      )}
                  </Grid>{" "}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Center>
        </div>
      </div>
      <hr className="mt-4" />
    </>
  );
}

export default PortFolio;
