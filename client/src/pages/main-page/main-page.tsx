import { useState, useEffect, useCallback } from 'react'
import { CoinInfo } from '../../types'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../components/common/button'

import styles from './main-page.module.scss'
import { CoinList } from '../../components/coin-list'
import { Loader } from '../../components/common/loader'

import { trpcReact } from '../../trpc'
import { ITEMS_PER_PAGE } from '../../constants'

export const MainPage = () => {
    const [currentCoins, setCurrentCoins] = useState<CoinInfo[]>([])

    const [isLoading, setIsLoading] = useState(true)

    const [hasPrevPage, setHasPrevPage] = useState(false)

    const location = useLocation()

    const navigate = useNavigate()

    const [currPage, setCurrPage] = useState(0)

    const trpcContext = trpcReact.useContext()

    const getData = useCallback(async (pageNumber: number) => {
        try {
            const pageData = await trpcContext.crypto.getPageData.fetch({ pageNumber: pageNumber, itemsPerPage: ITEMS_PER_PAGE })
            return pageData
        } catch (err) {
            console.error(err)
            return [] as CoinInfo[]
        }
    }, [trpcContext])

    const loadData = async (currPage: number) => {
        setIsLoading(true)

        const pageData = await getData(currPage)

        if (!pageData.length) {
            const prevPageData = await getData(currPage - 1)

            setHasPrevPage(prevPageData.length > 0)
        }

        setCurrentCoins(pageData)
        setIsLoading(false)
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)

        const currPage = Number(queryParams.get('page')) || 0

        setCurrPage(currPage)

        loadData(currPage)
    }, [location.search])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && !!currentCoins.length && (
                <>
                    <h2 className={styles.title}>Available coins</h2>
                    <CoinList items={currentCoins} />
                    <div className={styles.paginationContainer}>
                        {currPage > 0 && (
                            <Button
                                onClick={() =>
                                    navigate(`?page=${currPage - 1}`)
                                }
                            >
                                Previous
                            </Button>
                        )}
                        <span>{`${currPage + 1}`}</span>
                        <Button
                            onClick={() => navigate(`?page=${currPage + 1}`)}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
            {!isLoading && !currentCoins.length && (
                <div className={styles.noCoins}>
                    <h3>No coins here...</h3>
                    {hasPrevPage ? (
                        <>
                            <p>But there are some on the previous page.</p>
                            <Button
                                onClick={() =>
                                    navigate(`?page=${currPage - 1}`)
                                }
                            >
                                To previous page
                            </Button>
                        </>
                    ) : (
                        <>
                            <p>
                                And it looks like you got to here by some
                                external way, so the only thing we can suggest
                                you is to go back to initial page.
                            </p>
                            <Button onClick={() => navigate(`?page=${0}`)}>
                                To initial page
                            </Button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
