import { AnimationItem } from "lottie-web";
import { useEffect, useState } from "react";

// Hook personnalisé pour le préchargement Lottie
export const usePreloadLottie = (animationData: any): boolean => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    let animation: AnimationItem | null = null;
    let tempDiv: HTMLDivElement | null = null;
    let cleanup = (): void => {};

    const preloadAnimation = async (): Promise<void> => {
      try {
        tempDiv = document.createElement("div");
        tempDiv.style.display = "none";
        document.body.appendChild(tempDiv);

        const lottie = await import("lottie-web");
        const lottieWeb = lottie.default || lottie;

        animation = lottieWeb.loadAnimation({
          container: tempDiv,
          renderer: "svg" as const,
          loop: false,
          autoplay: false,
          animationData,
        });

        const handleDOMLoaded = (): void => {
          setIsLoaded(true);
          cleanup(); // Appel du nettoyage après chargement
        };

        // Fonction de nettoyage
        cleanup = (): void => {
          if (animation) {
            // Utilisation de l'opérateur de non-null assertion (!) car nous savons que animation n'est pas null ici
            animation!.removeEventListener("DOMLoaded", handleDOMLoaded);
            animation!.destroy();
          }
          if (tempDiv && document.body.contains(tempDiv)) {
            document.body.removeChild(tempDiv);
          }
        };

        if (animation) {
          animation.addEventListener("DOMLoaded", handleDOMLoaded);
        }
      } catch (error) {
        console.error("Erreur lors du préchargement de l'animation:", error);
        setIsLoaded(true);
      }
    };

    preloadAnimation();

    // Retourne la fonction de nettoyage actuelle
    return () => cleanup();
  }, [animationData]);

  return isLoaded;
};
