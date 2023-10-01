import styles from './AppImage.module.scss'

export default function AppImage({ src, alt, ...props }) {

  return (
    <img
      src={src || '/images/no-image.svg'}
      alt={alt}
      {...props}
    />
  );
}