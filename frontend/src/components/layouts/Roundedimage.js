import styles from './Roundedimage.module.css'


function RoundedImage({ src, alt, width }) {

    return (
        <img
            className={`${styles.rounded_image} ${width ? styles[width] : ''}`}
            src={src}
            alt={alt}
        />
    )
}

export default RoundedImage;