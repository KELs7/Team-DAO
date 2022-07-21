import Lamden from 'lamden-js';
import { getBlock, SendSingleTx } from './lamdenbatchfactory/utils.mjs';



//const blockServiceUrl = 'http://localhost:3535'

//const myWallet = Lamden.wallet.create_wallet({sk:'209c7d09477c45fd41b272f6cfa26759565c723529bd568a6e6db2ec32803dc9'})

export const buildTxInfo = (type, args) => {
    let kwargs;
    switch(type){
        case 'addOwner':
            kwargs = {'propsl': {
                'add_owner': args,
                'type': 'state_update'
                }
            };
            break;

        case 'replaceOwner':
            kwargs = {'propsl': {
                'replace_owner': {
                    'new_owner': args[0],
                    'existing_owner': args[1]
                },
                'type': 'state_update'
                }
            };
            break;
            
        case 'removeOwner':
            kwargs = {
                'propsl': {
                    'remove_owner': args[0],
                    'type': 'state_update'
                }
            };
            break;

        case 'registerAction':
            kwargs = {
                'propsl': {
                    'register_action': {
                        'action': args[0],
                        'contract': args[1]
                    },
                    'type': 'state_update'
                }
            };
            break;

        case 'unregisterAction':
            kwargs = {
                'propsl': {
                    'unregister_action': args[0],
                    'type': 'state_update'
                }
            };
            break;

        case 'confirms':
            kwargs = {
                'propsl': {
                    'change_requirement': Lamden.Encoder('int', args[0]),
                    'type': 'state_update'
                }
            };
            break;

        case 'dailyLimit':
            kwargs = {'propsl': {
                'change_dailylimit': {
                    'token': args[0], 
                    'amount': Lamden.Encoder('float',args[1])
                    },
                'type': 'state_update'
                }
            };
            break;

        case 'transfer':
            kwargs = {'propsl': {
                'token': args[0],
                'payload': {
                    'method': 'transfer', 
                    'amount': Lamden.Encoder('float',args[1]),
                    'to': args[2]   
                    },
                'type': 'lst001_proposal'
                }
            };
            break;

        case 'approve':
            kwargs = {'propsl': {
                'token': args[0],
                'payload': {
                    'method': 'approve', 
                    'amount': Lamden.Encoder('float',args[1]),
                    'to': args[2],
                    },
                'type': 'lst001_proposal'
                }
            };
            break;

        case 'transferFrom':
            kwargs = {'propsl': {
                'token': args[0],
                'payload': {
                    'method': 'transfer_from', 
                    'amount': Lamden.Encoder('float',args[1]),
                    'to': args[2],
                    'main_account': args[3],
                    },
                'type': 'lst001_proposal'
                }
            };
            break;

        case 'action':
            kwargs = {'propsl': {
                'action': args[0],
                'bulk': args[1],
                'payload':args[2],
                'type': 'action_proposal'
                }
            };
            break;

        case 'extAction':
            kwargs = {'propsl': {
                'action_core': args[0],
                'action': args[1],
                'payload':args[2],
                'type': 'external_action_proposal'
                }
            };
            break;
    }

    // const transaction = {
    //     vk: myWallet.vk,
    //     contract: 'multi_sign',
    //     method: 'submit_proposal',
    //     kwargs: kwargs,
    //     stamps: 10000,
    // };

    const txInfo = {
        networkType: 'marvinnet', // other option is 'testnet'
        contractName: 'multi_sign',
        methodName: 'submit_proposal', 
        kwargs: kwargs, 
        stampLimit: 100
    };

    return txInfo
};

export const confirmProposal = (proposalId) => {
    const kwargs = {
        'proposal_id': Lamden.Encoder('int', proposalId)
    }
        
    const transaction = {
        vk: myWallet.vk,
        contract: 'multi_sign',
        method: 'confirm_proposal',
        kwargs: kwargs,
        stamps: 10000,
    };

    return transaction

}

export const revokeProposal = (proposalId) => {
    const kwargs = {
        'proposal_id': Lamden.Encoder('int', proposalId)
    }
    const transaction = {
        vk: myWallet.vk,
        contract: 'multi_sign',
        method: 'revoke_proposal',
        kwargs: kwargs,
        stamps: 10000,
    };

    return transaction

}




//***********************************************************************************
