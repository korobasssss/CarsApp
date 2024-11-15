import { Start1Img, Start1MobileImg, Start2Img, Start2MobileImg, Start3Img, Start3MobileImg } from "@/shared/assets"
import { useMemo } from "react"
import { useMediaQuery } from "react-responsive"
import { Carousel } from "ui-kit-cars/main"

export const MainComponent = () => {

    const isMobile = useMediaQuery({query: '(max-width: 767px)'})

    const images: string[] = useMemo(() => {
        return [
            Start1Img, Start2Img, Start3Img
        ]
    }, [])

    const imagesMobile: string[] = useMemo(() => {
        return [
            Start1MobileImg, Start2MobileImg, Start3MobileImg
        ]
    }, [])

    return (
        <Carousel images={isMobile ? imagesMobile : images}/>
    )
}