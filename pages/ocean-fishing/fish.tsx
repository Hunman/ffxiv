import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Collapse from '@mui/material/Collapse'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import { ChecklistContext } from './index'
import Page from '../../src/Page'
import Section from '../../src/Section'
import Link from '../../src/Link'
import NavigationBar from '../../src/ocean-fishing/NavigationBar'
import ImportFishes from '../../src/ocean-fishing/ImportFishes'
import FishTable from '../../src/ocean-fishing/FishTable'
import { fishingSpots } from '../../src/ocean-fishing/ffxiv-ocean-fishing/data'
import translate from '../../src/translate'

const Fish = (): React.ReactElement => {
    const { t, i18n } = useTranslation('ocean-fishing')
    const [checklist, setChecklist] = useState<number[]>([])
    const [showImport, setShowImport] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = window.localStorage.getItem('ocean-fishing/checklist')
            if (data !== null) {
                setChecklist(data.split(',').map(x => Number(x) | 0).filter(x => x))
            }
        }
    }, [])
    useEffect(() => {
        window.localStorage.setItem('ocean-fishing/checklist', checklist.join(','))
    }, [checklist])

    const toggleShowImport = (): void => {
        setShowImport(!showImport)
    }

    return (
        <Page title={[t('_title'), t('fishPage._title')]}>
            <NavigationBar />
            <ChecklistContext.Provider value={{ checklist, setChecklist }}>
                <Section>
                    <Typography paragraph>
                        Data are taken from the <Link href='https://docs.google.com/spreadsheets/d/1R0Nt8Ye7EAQtU8CXF1XRRj67iaFpUk1BXeDgt6abxsQ/edit#gid=149797934'>Ocean Fishing Spreadsheet</Link> managed by Tyo’to Tayuun. Bite times are from <Link href='https://ffxivteamcraft.com/'>Teamcraft</Link>. For questions/comments/corrections, please visit the <Link href='https://discord.gg/AnFaDpN'>Fisherman’s Horizon Discord</Link> or message Lulu Pillow@Adamantoise or Pillowfication#0538.
                    </Typography>
                    <Button variant='contained' onClick={toggleShowImport}>Import Fishes</Button>
                </Section>
                <Collapse in={showImport}>
                    <Section>
                        <ImportFishes checklist={checklist} setChecklist={setChecklist} />
                    </Section>
                </Collapse>
                {Object.values(fishingSpots)
                    .filter(fishingSpot => fishingSpot.id !== 0)
                    .sort((a, b) => a.order - b.order)
                    .map(fishingSpot =>
                        <Section key={fishingSpot.id} title={translate(i18n.language, fishingSpot.placeName, 'name')}>
                            <TableContainer component={Paper}>
                                <FishTable fishingSpots={[fishingSpot]} />
                            </TableContainer>
                        </Section>
                    )}
            </ChecklistContext.Provider>
        </Page>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common', 'ocean-fishing']))
        }
    }
}

export default Fish
