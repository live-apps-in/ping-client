import { friendApi } from 'src/api'
import { useQueryState } from 'src/hooks'
import { handleError } from 'src/utils'

export const ViewFriends: React.FC = () => {

    const [friends, loading] = useQueryState({
        queryKey: 'friend',
        queryFn: friendApi.fetchFriends,
        onError: handleError
    })

    console.log(friends);
    
    return (
        <div>View Friends</div>
    )
}

export * from './request'
