import { useContext } from 'react'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'

import { AuthContext } from '../context/AuthContext'
import useProfile from '../hooks/useProfile'
import { logout } from '../services/auth'

const NavbarAdmin = () => {
  const userProfile = useProfile()

  const handleLogout = async () => await logout()

  return (
    <Flex
      mt={4}
      pr={8}
      pl={8}
      pb={4}
      flexDirection={'row'}
      justifyContent={'space-between'}
    >
      <Box>
        <Heading as="h3" size="md" mb={2}>
          Welcome
        </Heading>
        <Text fontSize="sm" color="#718096" fontWeight={'600'}>
          {userProfile ? userProfile.username : 'Sin Datos'}
        </Text>
      </Box>
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  )
}

export default NavbarAdmin
