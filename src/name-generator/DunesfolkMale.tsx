import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Section from '../Section'
import NameAutocomplete from './NameAutocomplete'
import MyNameIs from './MyNameIs'
import { charaMakeNames } from './ffxiv-name-generator/data'
import { translate, Clan, Gender } from './ffxiv-name-generator'
import { upperFirst, formatName } from './ffxiv-name-generator/src/utils'

function splitPhoneme (phoneme: string): string {
  return phoneme.slice(0, phoneme.length / 2)
}

const DunesfolkMale = (): React.ReactElement => {
  const { t, i18n } = useTranslation('name-generator')
  const [phonemeA, setPhonemeA] = useState('')
  const [phonemeB, setPhonemeB] = useState('')
  const [phonemeC, setPhonemeC] = useState('')
  const name = formatName(phonemeA + phonemeA + phonemeB, phonemeC + phonemeC + phonemeB)
  const locale = i18n.language

  return (
    <Section title={`${translate('clan', Clan.Dunesfolk, locale)} (${translate('gender', Gender.Male, locale)})`}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NameAutocomplete
                options={charaMakeNames.lalafell_dunesfolk_male.map(splitPhoneme)}
                value={phonemeA}
                onChange={setPhonemeA}
                label={t('phoneme', { label: 'A' })}
                placeholder={t('enterPhoneme')}
              />
            </Grid>
            <Grid item xs={12}>
              <NameAutocomplete
                options={charaMakeNames.lalafell_dunesfolk_male_lastName.map(upperFirst)}
                value={phonemeB}
                onChange={setPhonemeB}
                label={t('phoneme', { label: 'B' })}
                placeholder={t('enterPhoneme')}
              />
            </Grid>
            <Grid item xs={12}>
              <NameAutocomplete
                options={charaMakeNames.lalafell_dunesfolk_male.map(splitPhoneme)}
                value={phonemeC}
                onChange={setPhonemeC}
                label={t('phoneme', { label: 'C' })}
                placeholder={t('enterPhoneme')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Lalafellen names are ruled by rhythm, repetition, and rhyming. Male Dunesfolk names follow the phoneme pattern <b>AAB CCB</b>.
          </Typography>
          <Typography paragraph>
            The <b>A</b> and <b>C</b> phonemes are one syllable, and the <b>B</b> phoneme is two.
          </Typography>
        </Grid>
        {name.length > 0 && (
          <Grid item xs={12}>
            <MyNameIs name={name} />
          </Grid>
        )}
      </Grid>
    </Section>
  )
}

export default DunesfolkMale
