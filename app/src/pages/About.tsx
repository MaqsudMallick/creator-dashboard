import { useMantineTheme } from "@mantine/core";
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconMailFilled,
} from "@tabler/icons-react";

const About = () => {
  const theme = useMantineTheme();
  const appName = "Creators Dashboard";
  return (
    <>
      <div
        className="mx-4 p-8 mt-10 rounded-2xl shadow-md md:w-[400px] lg:w-1/2 mx-auto"
        style={{
          backgroundColor: theme.colors.gray[8],
        }}
      >
        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        <p className="text-lg mb-4">
          Welcome to <span className="font-semibold">[{appName}]</span> — your
          go-to post aggregator built to simplify the way you discover, save,
          and engage with content.
        </p>

        <p className="text-lg mb-4">
          We believe the online experience should be effortless and rewarding.
          That’s why we designed{" "}
          <span className="font-semibold">[{appName}]</span> with a few key
          features to keep things simple and powerful:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <span className="font-semibold">Feed Page</span>: Browse a
            constantly updated stream of posts tailored for you.
          </li>
          <li>
            <span className="font-semibold">Favourites</span>: Save your
            favorite posts for easy access anytime.
          </li>
          <li>
            <span className="font-semibold">Credit System</span>: Earn credits
            by interacting with posts — a small way we make your engagement even
            more meaningful.
          </li>
        </ul>

        <p className="text-lg mb-6">
          Whether you’re here to stay updated, find inspiration, or just pass
          time, <span className="font-semibold">[App Name]</span> ensures
          everything you love is only a tap away.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Stay Connected
        </h2>

        <div className="flex gap-3 mb-6 text-center w-full justify-center">
          <IconBrandGithubFilled
            size={20}
            className="cursor-pointer"
            onClick={() =>
              window.open("https://github.com/MaqsudMallick", "_blank")
            }
          />
          <IconBrandLinkedinFilled
            size={20}
            className="cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/maqsud-mallick-6a290415b/",
                "_blank",
              )
            }
          />
          <IconMailFilled
            size={20}
            className="cursor-pointer"
            onClick={() =>
              window.open("mailto:maqsudmallick@gmail.com", "_blank")
            }
          />
        </div>

        <p className="text-lg">
          We’re constantly working to make your experience better. Feel free to
          reach out, share feedback, or just say hello!
        </p>
      </div>
    </>
  );
};

export default About;
