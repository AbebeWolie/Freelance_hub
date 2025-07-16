import avatar1 from '../../src/assets/avatar1.jpeg';
import avatar2 from '../../src/assets/avatar2.jpeg';
import avatar3 from '../../src/assets/avatar3.jpeg';
import avatar4 from '../../src/assets/avatar4.jpeg';
import avatar5 from '../../src/assets/avatar5.jpeg';
import avatar6 from '../../src/assets/avatar6.jpeg';
import { 
  FiCode,        // Development & IT
  FiUser,        // Admin & Support

} from "react-icons/fi";
import {
  FaPalette,     // Design & Creative
  FaRobot,       // AI Services
  FaHandshake,   // Sales & Marketin
  FaUniversity  , // Finance & Accounting,
  FaStar ,       // Rating

} from "react-icons/fa";

export const testimonials = [
  {
    icon: <FiCode className="text-primary" />,
    category: "DEV & IT",
    quote:
      "Haris came in and helped us transfer knowledge from our departing developer, meeting a serious deadline, without fail. His knowledge and experience are exceptional.",
    rating: <FaStar className="text-yellow-500"/>,
    author: {
      name: "Haris S.",
      role: "Full-Stack Developer",
      date: "Apr 7, 2025",
      avatar: avatar1
    },
  },
  {
    icon: <FaPalette className="text-primary" />,
    category: "Design & Creative",
    quote:
      "Extremely professional and fast. Haris integrated seamlessly with our team and completed the job flawlessly.",
    rating: <FaStar className="text-yellow-500"/>,
    author: {
      name: "Haris S.",
      role: "Full-Stack Developer",
      date: "May 12, 2025",
      avatar: avatar2
    },
  },
  {
    icon: <FaRobot className="text-primary" />,
    category: "AI Services",
    quote:
      "Haris exceeded our expectations. He delivered robust, scalable solutions under tight deadlines.",
    rating: <FaStar className="text-yellow-500"/>,
    author: {
      name: "Haris S.",
      role: "Full-Stack Developer",
      date: "Jun 1, 2025",
      avatar: avatar4
    },
  },
  {
    icon: <FaHandshake className="text-primary" />,
    category: "Sales & Marketing",
    quote:
      "Reliable and communicative throughout the entire process. Haris was a pleasure to work with.",
    rating: <FaStar className="text-yellow-500"/>,
    author: {
      name: "Haris S.",
      role: "Full-Stack Developer",
      date: "Jul 4, 2025",
      avatar: avatar5
    },
  },
  {
    icon: <FaUniversity className="text-primary" />,
    category: "Writing & Translation",
    quote:
      "We were impressed with Haris’s depth of knowledge and his ability to tackle complex issues efficiently.",
    rating: <FaStar className="text-yellow-500"/>,
    author: {
      name: "Haris S.",
      role: "Full-Stack Developer",
      date: "Jul 10, 2025",
      avatar: avatar6
    },
  },
  {
    icon: <FiUser className="text-primary" />,
    category: "Admin & Customer Support",
    quote:
      "Delivered high-quality work ahead of schedule. Haris demonstrated real ownership and initiative.",
    rating: <FaStar className="text-yellow-500"/>,
    author: {
      name: "Haris S.",
      role: "Full-Stack Developer",
      date: "Jul 14, 2025",
      avatar: avatar3
    },
  },
];
