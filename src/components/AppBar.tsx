import { Button, Heading, Stack } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export function AppBar() {
  const { t, i18n } = useTranslation()

  function handleChange(lang: string) {
    return () => {
      localStorage.setItem('locale', lang)
      i18n.changeLanguage(lang)
    }
  }

  return (
    <Stack alignItems='center' direction='row' p='4' bgColor='whiteAlpha.50' justify='space-between'>
      <Link to='/'>
        <Heading fontSize='md'>
          {t('🃏 Scritch')}
        </Heading>
      </Link>

      <MenuRoot>
        <MenuTrigger asChild>
          <Button variant="outline" size="sm">
            {t('Language')}
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onClick={handleChange('en')} value="en">
            {t('English')}
          </MenuItem>
          <MenuItem onClick={handleChange('nl')} value="nl">
            {t('Nederlandse')}
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </Stack>
  )
}