import book1 from "../assets/images/atomicHabits.jpg"
import book2 from "../assets/images/alchemist.jpg"
import book3 from "../assets/images/richDad.jpg"
import book4 from "../assets/images/splendidSvns.jpg"
import book5 from "../assets/images/upsc.jpg"
import book6 from "../assets/images/hcverma.jpg"
import book7 from "../assets/images/ca.jpg"
import book8 from "../assets/images/neet.jpg"
import book9 from "../assets/images/book9.jpg"
import book10 from "../assets/images/book10.jpg"
import book11 from "../assets/images/book11.jpg"
import book12 from "../assets/images/book12.jpg"
import book13 from "../assets/images/book13.jpg"
import book14 from "../assets/images/book14.jpg"
import book15 from "../assets/images/book15.jpg"
import book16 from "../assets/images/book16.jpg"
import book17 from "../assets/images/book17.jpg"
import book18 from "../assets/images/book18.jpg"
import book19 from "../assets/images/book19.jpg"
import book20 from "../assets/images/book20.jpg"
import book21 from "../assets/images/book21.jpg"
import book22 from "../assets/images/book22.jpg"
import book23 from "../assets/images/book23.jpg"
import book24 from "../assets/images/book24.jpg"
import book25 from "../assets/images/book25.jpg"
import book26 from "../assets/images/book26.jpg"
import book27 from "../assets/images/book27.jpg"
import book28 from "../assets/images/book28.jpg"
import book29 from "../assets/images/book29.jpg"
import book30 from "../assets/images/book30.jpg"
import book31 from "../assets/images/book31.jpg"
import book32 from "../assets/images/book32.jpg"
import book33 from "../assets/images/book33.jpg"
import book34 from "../assets/images/book34.jpg"
import book35 from "../assets/images/book35.jpg"
import book36 from "../assets/images/book36.jpg"
import book37 from "../assets/images/book37.jpg"
import book38 from "../assets/images/book38.jpg"
import book39 from "../assets/images/book39.jpg"
import book40 from "../assets/images/book40.jpg"
import book41 from "../assets/images/book41.jpg"
import book42 from "../assets/images/book42.jpg"
import book43 from "../assets/images/book43.jpg"
import book44 from "../assets/images/book44.jpg"
import book45 from "../assets/images/book45.jpg"
import book46 from "../assets/images/book46.jpg"
import book47 from "../assets/images/book47.jpg"
import book48 from "../assets/images/book48.jpg"

const books = [
  {
    id: 1,
    image: book1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    price: "Rs 150/-",
    isBestSeller: true
  },

  {
    id: 2,
    image: book2,
    title: "Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: "Rs 100/-",
    isBestSeller: true
  },

  {
    id: 3,
    image: book3,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Business",
    price: "Rs 120/-",
    isBestSeller: true
  },

  {
    id: 4,
    image: book4,
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    category: "Fiction",
    price: "Rs 110/-",
    isBestSeller: true
  },

  {
    id: 5,
    image: book5,
    title: "UPSC Exam Guide",
    author: "Tanisha Tandel",
    category: "Competitive Exams",
    price: "Rs 450/-",
    isExamBook: true
  },

  {
    id: 6,
    image: book6,
    title: "Concepts Of Physics",
    author: "HC Verma",
    category: "Academic Books",
    price: "Rs 300/-",
    isExamBook: true
  },

  {
    id: 7,
    image: book7,
    title: "Thinking Strategically",
    author: "Avinash K. Dixit",
    category: "Business",
    price: "Rs 320/-",
    isExamBook: true
  },

  {
    id: 8,
    image: book8,
    title: "Chemistry For NEET",
    author: "Arihant",
    category: "Competitive Exams",
    price: "Rs 300/-",
    isExamBook: true
  },

  //self help
{
    id: 9,
    image: book9,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    category: "Self Help",
    price: "Rs 180/-"
},

{
    id: 10,
    image: book10,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Self Help",
    price: "Rs 160/-"
},

{
    id: 11,
    image: book11,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Self Help",
    price: "Rs 200/-"
},

{
    id: 12,
    image: book12,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Self Help",
    price: "Rs 190/-"
},

 //fiction
{
    id: 13,
    image: book13,
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    category: "Fiction",
    price: "Rs 140/-"
},

{
    id: 14,
    image: book14,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    price: "Rs 150/-"
},

{
    id: 15,
    image: book15,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    price: "Rs 130/-"
},

{
    id: 16,
    image: book16,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    price: "Rs 140/-"
},

//busisness
{
    id: 17,
    image: book17,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business",
    price: "Rs 220/-"
},

{
    id: 18,
    image: book18,
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    price: "Rs 210/-"
},

{
    id: 19,
    image: book19,
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    price: "Rs 200/-"
},

{
    id: 20,
    image: book20,
    title: "Good to Great",
    author: "Jim Collins",
    category: "Business",
    price: "Rs 190/-"
},

//competitive exams
{
    id: 21,
    image: book21,
    title: "SSC CGL Complete Guide",
    author: "Disha Experts",
    category: "Competitive Exams",
    price: "Rs 350/-"
},

{
    id: 22,
    image: book22,
    title: "Quantitative Aptitude",
    author: "R.S. Aggarwal",
    category: "Competitive Exams",
    price: "Rs 280/-"
},

{
    id: 23,
    image: book23,
    title: "General Studies Manual",
    author: "TMH",
    category: "Competitive Exams",
    price: "Rs 420/-"
},

{
    id: 24,
    image: book24,
    title: "JEE Main Mathematics",
    author: "Arihant",
    category: "Competitive Exams",
    price: "Rs 390/-"
},

//academic books
{
    id: 25,
    image: book25,
    title: "Engineering Mathematics",
    author: "B.S. Grewal",
    category: "Academic Books",
    price: "Rs 450/-"
},

{
    id: 26,
    image: book26,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "Academic Books",
    price: "Rs 500/-"
},

{
    id: 27,
    image: book27,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    category: "Academic Books",
    price: "Rs 550/-"
},

{
    id: 28,
    image: book28,
    title: "Database System",
    author: "Camila Thompson",
    category: "Academic Books",
    price: "Rs 520/-"
},

//programming
{
    id: 29,
    image: book29,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    price: "Rs 400/-"
},

{
    id: 30,
    image: book30,
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    category: "Programming",
    price: "Rs 350/-"
},

{
    id: 31,
    image: book31,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    category: "Programming",
    price: "Rs 300/-"
},

{
    id: 32,
    image: book32,
    title: "Cracking the Coding Interview",
    author: "Gayle McDowell",
    category: "Programming",
    price: "Rs 450/-"
},

//engineering
{
    id: 33,
    image: book33,
    title: "Strength of Materials",
    author: "R.K. Bansal",
    category: "Engineering",
    price: "Rs 320/-"
},

{
    id: 34,
    image: book34,
    title: "Fluid Mechanics",
    author: "Mahesh Kumar",
    category: "Engineering",
    price: "Rs 340/-"
},

{
    id: 35,
    image: book35,
    title: "Electrical Machines",
    author: "P.S. Bimbhra",
    category: "Engineering",
    price: "Rs 380/-"
},

{
    id: 36,
    image: book36,
    title: "Thermodynamics",
    author: "P.K. Nag",
    category: "Engineering",
    price: "Rs 360/-"
},

//medical
{
    id: 37,
    image: book37,
    title: "Gray's Anatomy",
    author: "Henry Gray",
    category: "Medical",
    price: "Rs 600/-"
},

{
    id: 38,
    image: book38,
    title: "Guyton Physiology",
    author: "John E. Hall",
    category: "Medical",
    price: "Rs 580/-"
},

{
    id: 39,
    image: book39,
    title: "Robbins Pathology",
    author: "Vinay Kumar",
    category: "Medical",
    price: "Rs 650/-"
},

{
    id: 40,
    image: book40,
    title: "BD Chaurasia Anatomy",
    author: "B.D. Chaurasia",
    category: "Medical",
    price: "Rs 550/-"
},

//school books
{
    id: 41,
    image: book41,
    title: "NCERT Mathematics Class 10",
    author: "NCERT",
    category: "School Books",
    price: "Rs 120/-"
},

{
    id: 42,
    image: book42,
    title: "NCERT Science Class 10",
    author: "NCERT",
    category: "School Books",
    price: "Rs 130/-"
},

{
    id: 43,
    image: book43,
    title: "NCERT English Class 12",
    author: "NCERT",
    category: "School Books",
    price: "Rs 110/-"
},

{
    id: 44,
    image: book44,
    title: "NCERT Economics Class 12",
    author: "NCERT",
    category: "School Books",
    price: "Rs 140/-"
},

//novels
{
    id: 45,
    image: book45,
    title: "The Fault in Our Stars",
    author: "John Green",
    category: "Novels",
    price: "Rs 180/-"
},

{
    id: 46,
    image: book46,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Novels",
    price: "Rs 170/-"
},

{
    id: 47,
    image: book47,
    title: "The Book Thief",
    author: "Markus Zusak",
    category: "Novels",
    price: "Rs 190/-"
},

{
    id: 48,
    image: book48,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Novels",
    price: "Rs 210/-"
}
];

export default books;
