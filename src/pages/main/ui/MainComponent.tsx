import { Start1Img, Start1MobileImg, Start2Img, Start2MobileImg, Start3Img, Start3MobileImg } from "@/shared/assets"
import { useMediaQuery } from "react-responsive"
import { Carousel } from "ui-kit-cars/main"

const images: string[] = [ Start1Img, Start2Img, Start3Img ]
const imagesMobile: string[] = [ Start1MobileImg, Start2MobileImg, Start3MobileImg ]

export const MainComponent = () => {
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})

    return (
        <Carousel images={isMobile ? imagesMobile : images}/>
    )
}