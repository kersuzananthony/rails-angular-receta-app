class RecipesController < ApplicationController

  def index
    if params[:keywords]
      @recipes = Recipe.where('name ilike ?', "#{params[:keywords]}")
    else
      @recipes = []
    end
  end

end