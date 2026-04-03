import CourseHero from "../components/CourseHero";
import VideoTestimonials from "../components/VideoTestimonials";
import CoursePainPoints from "../components/CoursePainPoints";
import CourseContent from "../components/CourseContent";
import CourseJourney from "../components/CourseJourney";

export default function CoursePage() {
  return (
    <main className="bg-[#0b0f14] text-white">
      <CourseHero />
      <VideoTestimonials />
      <CoursePainPoints />
      <CourseContent />
      <CourseJourney />
    </main>
  );
}
