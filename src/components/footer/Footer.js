import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../common/Text/Text';

export const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <Text
        value={`© ${currentYear} FastMath`}
        size={TEXT_SIZE.REGULAR}
        weight={TEXT_WEIGHT.MEDIUM}
        kind={TEXT_KIND.LABEL}
        display={TEXT_DISPLAY.BLOCK}
        align={TEXT_ALIGN.CENTER}
      />
    </div>
  )
}
