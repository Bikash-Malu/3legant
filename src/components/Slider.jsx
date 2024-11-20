import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const slides = [
  { id: 1, label: "Slide 1", image: "https://s3-alpha-sig.figma.com/img/7dce/fc24/0db6128ab1993d65eae0e96498fbd94e?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qgREUSpJ~yZSTlmUnmX-wEJqICMsHa-bJRt7uX6gW9qt68qk5rMd53vndqdWJk7X2pKP1d67CIWt1SZHEd-55X2nbTUFVcamsJ4E9Rtwbvb68ZTMC8B~XcygWlw1UUfS~bvNUNQ8OWefmgiaf7H0LRGrHGQx23WNgimRh02KAZqSB-AhNxrxUFU9m2A78ZhYk0BP3afHl1DVPde19-KES-F3haYMR~xaEHSGoWkOLfpgwdrE~yOcFvng6j7kFWPXR53aJSbOE6ectjWdnII1EcbLhEeVUvHpRt7ZHqT-Q5sw3CptwI2NaVc2OD0qB~4WgYfN6Vd77t~Y1dxoAK1BCg__" },
  { id: 2, label: "Slide 2", image: "https://s3-alpha-sig.figma.com/img/7dce/fc24/0db6128ab1993d65eae0e96498fbd94e?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qgREUSpJ~yZSTlmUnmX-wEJqICMsHa-bJRt7uX6gW9qt68qk5rMd53vndqdWJk7X2pKP1d67CIWt1SZHEd-55X2nbTUFVcamsJ4E9Rtwbvb68ZTMC8B~XcygWlw1UUfS~bvNUNQ8OWefmgiaf7H0LRGrHGQx23WNgimRh02KAZqSB-AhNxrxUFU9m2A78ZhYk0BP3afHl1DVPde19-KES-F3haYMR~xaEHSGoWkOLfpgwdrE~yOcFvng6j7kFWPXR53aJSbOE6ectjWdnII1EcbLhEeVUvHpRt7ZHqT-Q5sw3CptwI2NaVc2OD0qB~4WgYfN6Vd77t~Y1dxoAK1BCg__" },
  { id: 3, label: "Slide 3", image: "https://s3-alpha-sig.figma.com/img/7dce/fc24/0db6128ab1993d65eae0e96498fbd94e?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qgREUSpJ~yZSTlmUnmX-wEJqICMsHa-bJRt7uX6gW9qt68qk5rMd53vndqdWJk7X2pKP1d67CIWt1SZHEd-55X2nbTUFVcamsJ4E9Rtwbvb68ZTMC8B~XcygWlw1UUfS~bvNUNQ8OWefmgiaf7H0LRGrHGQx23WNgimRh02KAZqSB-AhNxrxUFU9m2A78ZhYk0BP3afHl1DVPde19-KES-F3haYMR~xaEHSGoWkOLfpgwdrE~yOcFvng6j7kFWPXR53aJSbOE6ectjWdnII1EcbLhEeVUvHpRt7ZHqT-Q5sw3CptwI2NaVc2OD0qB~4WgYfN6Vd77t~Y1dxoAK1BCg__" },
];

export default function Slider() {
  return (
    <Carousel className="w-full max-w-5xl mx-auto my-8">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="p-4">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <img src={slide.image} alt={slide.label} className="rounded-lg w-full" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-2 shadow hover:bg-gray-200" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-2 shadow hover:bg-gray-200" />
    </Carousel>
  );
}
