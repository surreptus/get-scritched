import { Route, Routes } from "react-router";
import { Game, Home, Setup } from "./pages";
import { Button, Heading, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./components/ui/menu";

function App() {
  const { t, i18n } = useTranslation()

  function handleChange(lang: string) {
    return () => i18n.changeLanguage(lang)
  }

  return (
    <div>
      <Stack direction='row' p='4' bgColor='whiteAlpha.100' justify='space-between'>
        <Heading fontSize='md'>
          {t('🃏 Scritch')}
        </Heading>

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
