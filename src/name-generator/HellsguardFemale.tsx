import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Section from '../Section'
import NameAutocomplete from './NameAutocomplete'
import MyNameIs from './MyNameIs'
import { translate } from './names'
import { upperFirst } from './names/utils'
import { Clan, Gender } from './names/types'
import { FORENAMES, SURNAMES } from './names/generate-roegadyn'
import { useTranslation } from '../i18n'

const HellsguardFemale = () => {
  const { t, i18n } = useTranslation('name-generator')
  const [forename, setForename] = useState('')
  const [surname, setSurname] = useState('')
  const name = `${upperFirst(forename)} ${upperFirst(surname)}`.trim()
  const locale = i18n.language

  return (
    <Section title={`${translate('clan', Clan.Hellsguard, locale)} (${translate('gender', Gender.Female, locale)})`}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={FORENAMES[Clan.Hellsguard]}
            value={forename}
            onChange={setForename}
            label={t('forename')}
            placeholder={t('enterForename')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Hellsguard names are formed from two words translated to modern Eorzean, typically a descriptor and a noun. They tend to draw heavily from nature, whether it’s a vegetable, an animal, animate, inanimate, abstract, or concrete. For female names, the second word tends to plant imagery (e.g. “Lily”, “Orchid”), though there are many that do not, and it is not exclusive to female names.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={SURNAMES[Clan.Hellsguard][Gender.Female]}
            value={surname}
            onChange={setSurname}
            label={t('surname')}
            placeholder={t('enterSurname')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Highly independent in nature, Hellsguard who leave their mountain homes for the city-states of Eorzea will often drop their family names.
          </Typography>
        </Grid>
        {name && (
          <Grid item xs={12}>
            <MyNameIs name={name} />
          </Grid>
        )}
      </Grid>
    </Section>
  )
}

export default HellsguardFemale