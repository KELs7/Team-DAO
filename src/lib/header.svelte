<header class="desktop flex" >
	<div class="corner left flex row">
		<a href="https://rocketswap.exchange/" class="desktop max-content">
			<img src="icons/logo-rocket.svg" alt="Rocketswap" class="rocketship-icon" />
		</a>
		<div class="desktop flex row max-content">
			<div class="ml-1 rocketswap">
				<a href="/#">
					<h2>TEAM DAO</h2>
				</a>
			</div>

			<span class="inline-flex align-center ml-1 weight-300 max-content">
				Powered by <a href="https://www.lamden.io" class="link-primary">Lamden</a>
			</span>
		</div>
	</div>

	<!-- {#if $wallet_connected}
		<div class="wallet-balance-address desktop flex align-center">
			{`${$tau_balance} TAU | `}
			<a class="primary-link" href="{`${tauhq_addresses($wallet_vk)}`}" target="_blank">
				{format_wallet_address($wallet_vk)}
			</a>
		</div>
	{/if} -->

	<div class="corner right flex row align-center mobile">
		<img src="icons/menu-burger.svg"alt="menu" on:click/>
		<!-- toggle menu goes here top -->
	</div>

	<div class="corner right flex row align-center">
		<!-- {#if $wallet_connected}
			<button class="icon">
				<img src="icons/notification.svg" alt="notification">
			</button>
		{/if} -->
		<a href="https://twitter.com/RSwapOfficial" class="ml-1">
			<img src="icons/logo-telegram.svg" alt="Telegram" />
		</a>
		<a href="https://twitter.com/RSwapOfficial" class="ml-1">
			<img class="logo_medium" src="icons/logo-medium.svg" alt="Medium" />
		</a>
		<a href="https://twitter.com/RSwapOfficial" class="ml-1">
			<img src="icons/logo-twitter.svg" alt="Twitter" />
		</a>
	</div>
</header>


<header class="mobile flex col">
    <div class="flex">
        <div class="corner left flex row">

            <a href="https://rocketswap.exchange/" class="desktop max-content">
				<img src="icons/logo-rocket.svg" alt="Rocketswap" class="rocketship-icon"/>
			</a>

            <div class="flex col grow-1">

                <a href="#/" class="rocketswap">
                    <h2>TEAM DAO</h2>
                </a>
                
                <span class="subtitle inline-flex align-center ml-1 weight-300 max-content">
                    Powered by <a href="https://www.lamden.io" class="link-primary  ml-1 mr-1em">Lamden</a>
                </span>

            </div>
        </div>

        <div class="corner right flex row align-center mobile">
            <img src='icons/menu-burger.svg' 
                alt='menu-burger'
                on:click>
        </div>
    </div>
</header>

<style>
    /* header{
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 0;
        left: 0;
        width: 100vw;
        padding: 4vh 5vw;
        box-sizing: border-box;
         height: 5vw; 
        z-index: 100;
        background-color: var(--panel-background-color);
         padding: 1.2vw 2vw 1.2vw 6vw; 
        box-shadow: var(--panel-box-shadow-high);
    } 

    header div {
        justify-content: center;
    }
    
    img {
        cursor: pointer;
    }
    span{
        font-family: 'Poppins-ExtraLight'; 
        font-size: 0.75rem; 
        
        margin-bottom: 1rem; 
    }
    span a {
        color: var(--flat-primary); 
        text-decoration: none;      
    }
    h2{
        font-family:'Goldman-Regular';
        font-size: var(--units-8vw);
        margin: 0;

    } */


    header {
		position: fixed;
		box-sizing: border-box;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: 100;
		display: flex;
		justify-content: space-between;
		background-color: var(--panel-background-color);
		padding: var(--units-1_2vw) var(--units-2vw) var(--units-1_2vw) var(--units-6vw);
		height: var(--units-5vw);
		min-height: 38.5px;
        box-shadow: var(--panel-box-shadow-high);
        -webkit-box-shadow: var(--panel-box-shadow-high);
        -moz-box-shadow: var(--panel-box-shadow-high);
	}
	h2 {
		font-family:'Goldman-Regular';
		font-size: var(--units-2_5vw);
    }
    span{
        font-family: 'Poppins-Light'; 
    }
	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.corner.right > a {
		width: var(--units-2_5vw);
	}
	.corner.right > button {
		width: var(--units-2_3vw);
	}
	.corner.left{
		width: 40vw;
	}
    .corner h2 {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.corner img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	a.max-content{
		width: max-content;
	}
	
	a.link-primary{
		width: unset;
		font-weight: 200;
	}
	.rocketswap{
		line-height: 0.8;
		padding: var(--units-015vw);
	}
	img.logo_medium{
		height: 136%;
	}
	.wallet-balance-address{
		background-color: var(--background-color);
		border-radius: var(--units-06vw);
		box-shadow: var(--panel-box-shadow-high);
		height: 100%;
		padding: 0 var(--units-2vw);
		margin-right: calc(-1 * 12vw);
		width: fit-content;
		font-size: var(--units-1_15vw);
	}
	.wallet-balance-address > a{
		margin-left: var(--units-03vw);
	}

    @media (max-width: 768px) {
        header{
			font-size: var(--units-1vw);
        }
		.corner.left{
			width: 307.594px;
		}
    }


    @media (max-width: 480px) {
        header{
			padding: 4vh 5vw;
			height: unset;
        }
		header.connected{
			padding: 4vh 5vw 3vh;
		}
		h2 {
			font-family:'Goldman-Regular';
			font-size: 8.8vw; 
			margin: 0;
    	}
		.subtitle{
			font-size: 3vw;
		}
		
		.corner a{
			width: unset;
			height: unset;
		}
		.corner.right{
			width: 13vw;
		}
		.rocketswap{
			width: 50vw;
            text-decoration: none;   
		}
        .corner h2{
			height: unset;
        }
		.corner img{
			height: unset;
		}
		.corner.left{
			width: 100%;
			font-size: var(--units-1vw);
		}
		.mobile .rocketswap{
			width: 55vw;
		}
		.wallet-balance-address{
			margin-right: 4vw;
			padding: 1vh 2vh;
			font-size: 3.5vw;
		}
		.connected-row{
			margin-top: 3vh;
		}
    }
</style>