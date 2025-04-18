import Container from "./Container";
import LinkButton from "./LinkButton";

const HomeBanner = () => {
  return (
    <Container className="relative py-5">
      <div className="w-full bg-primary/10 rounded-xl overflow-hidden">
        <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-primary font-bold max-w-xl">
            Get <span className="text-green-500">free delivery</span> on shopping ₹200
          </h2>
          <p className="text-base md:text-lg font-normal text-gray-700 max-w-[450px] mt-4">
            Start your healthy lifestyle journey with fresh, organic produce delivered right to your door.
          </p>
          <LinkButton 
            className="w-44 mt-8 flex items-center justify-center bg-primary text-white hover:bg-primary/90 duration-200 rounded-full py-3 px-6 font-medium"
            text="Shop Now"
          />
        </div>
      </div>
    </Container>
  );
};

export default HomeBanner;
