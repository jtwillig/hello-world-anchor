use anchor_lang::prelude::*;

declare_id!("6VA2S3f2DpcdbvwVBJ2cK8xJrJRfBASRkkKNj531kEB5");

#[program]
pub mod hello_world_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>, data: Option<u64>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data += data.unwrap_or(1);
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>, data: Option<u64>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        let new_data: i64 = (my_account.data - data.unwrap_or(1)).try_into().unwrap();
        if new_data < 0 {
            return Err(ProgramError::InvalidArgument.into());
        }
        my_account.data = new_data.try_into().unwrap();
        Ok(())
    }

    pub fn reset(ctx: Context<Reset>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = 0;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,payer = user, space = 8 + 8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[derive(Accounts)]
pub struct Reset<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    pub data: u64,
}
