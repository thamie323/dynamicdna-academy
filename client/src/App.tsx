import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Courses from "./pages/Courses";
import Learnerships from "./pages/Learnerships";
import Corporate from "./pages/Corporate";
import Contact from "./pages/Contact";
import BecomeLearner from "./pages/BecomeLearner";
import BecomeClient from "./pages/BecomeClient";
import News from "./pages/News";
import StudentHub from "./pages/StudentHub";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNews from "./pages/AdminNews";
import AdminLearnerApplications from "./pages/AdminLearnerApplications";
import AdminClientApplications from "./pages/AdminClientApplications";
import AdminStudentStories from "./pages/AdminStudentStories";
import LocalLogin from "./pages/LocalLogin";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Local development login - no header/footer */}
      <Route path="/local-login" component={LocalLogin} />
      
      {/* Admin routes - no header/footer */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/news" component={AdminNews} />
      <Route path="/admin/learner-applications" component={AdminLearnerApplications} />
      <Route path="/admin/client-applications" component={AdminClientApplications} />
      <Route path="/admin/student-stories" component={AdminStudentStories} />
      
      {/* Public routes - with header/footer */}
      <Route path={"/"}>
        <>
          <Header />
          <Home />
          <Footer />
        </>
      </Route>
      <Route path="/about">
        <>
          <Header />
          <About />
          <Footer />
        </>
      </Route>
      <Route path="/programs">
        <>
          <Header />
          <Programs />
          <Footer />
        </>
      </Route>
      <Route path="/courses">
        <>
          <Header />
          <Courses />
          <Footer />
        </>
      </Route>
      <Route path="/learnerships">
        <>
          <Header />
          <Learnerships />
          <Footer />
        </>
      </Route>
      <Route path="/corporate">
        <>
          <Header />
          <Corporate />
          <Footer />
        </>
      </Route>
      <Route path="/become-learner">
        <>
          <Header />
          <BecomeLearner />
          <Footer />
        </>
      </Route>
      <Route path="/become-client">
        <>
          <Header />
          <BecomeClient />
          <Footer />
        </>
      </Route>
      <Route path="/news">
        <>
          <Header />
          <News />
          <Footer />
        </>
      </Route>
      <Route path="/student-hub">
        <>
          <Header />
          <StudentHub />
          <Footer />
        </>
      </Route>
      <Route path="/contact">
        <>
          <Header />
          <Contact />
          <Footer />
        </>
      </Route>
      <Route path={"/404"}>
        <>
          <Header />
          <NotFound />
          <Footer />
        </>
      </Route>
      {/* Final fallback route */}
      <Route>
        <>
          <Header />
          <NotFound />
          <Footer />
        </>
      </Route>
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
