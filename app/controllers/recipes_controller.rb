class RecipesController < ApplicationController

  before_action :set_recipe, only: [:show, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  def index
    if params[:keywords]
      @recipes = Recipe.where('name LIKE ?', "#{params[:keywords]}")
    else
      @recipes = Recipe.all
    end
  end

  def show

  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.save
    render :show, status: 201
  end

  def update
    @recipe.update(recipe_params)
    head :no_content
  end

  def destroy
    @recipe.destroy
    head :no_content
  end

  private
  def recipe_params
    params.require(:recipe).permit(:name, :instructions)
  end

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

end